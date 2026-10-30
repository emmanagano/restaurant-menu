import { cacheLife } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { Hours } from "@/lib/hours";
import type { Database } from "@/types/supabase";

type Tables = Database["public"]["Tables"];

export type Image = Tables["images"]["Row"];
export type Dish = Tables["dishes"]["Row"] & { image: Image | null };
export type MenuCategory = Tables["categories"]["Row"] & { dishes: Dish[] };
export type Location = Omit<Tables["locations"]["Row"], "hours"> & {
  hours: Hours;
  image: Image | null;
};
export type Pkg = Tables["packages"]["Row"];
export type PackageType = Pkg["type"];
export type Faq = Tables["faqs"]["Row"];
export type Testimonial = Tables["testimonials"]["Row"];

const DRINKS_SLUG = "drinks";

const hoursSchema = z.record(
  z.string().regex(/^[0-6]$/),
  z.object({ open: z.string(), close: z.string() }).nullable(),
);

export function parseHours(value: unknown): Hours {
  const parsed = hoursSchema.parse(value);
  return Object.fromEntries(
    Object.entries(parsed).map(([day, hours]) => [Number(day), hours]),
  );
}

type LocationRow = Tables["locations"]["Row"] & { image: Image | null };

const toLocation = ({ hours, ...rest }: LocationRow): Location => ({
  ...rest,
  hours: parseHours(hours),
});

/** Categories in menu order, each with its dishes in order. */
export async function getMenu(): Promise<MenuCategory[]> {
  "use cache";
  cacheLife("hours");
  const { data, error } = await createClient()
    .from("categories")
    .select("*, dishes(*, image:images(*))")
    .order("sort")
    .order("sort", { referencedTable: "dishes" });
  if (error) throw new Error(`getMenu: ${error.message}`);
  return data;
}

export async function getSignatureDishes(): Promise<Dish[]> {
  "use cache";
  cacheLife("hours");
  const { data, error } = await createClient()
    .from("dishes")
    .select("*, image:images(*)")
    .eq("is_signature", true)
    .order("sort");
  if (error) throw new Error(`getSignatureDishes: ${error.message}`);
  return data;
}

/** Number of food dishes (everything outside Drinks). Feeds the "recipes" stat. */
export async function getRecipeCount(): Promise<number> {
  "use cache";
  cacheLife("hours");
  const { count, error } = await createClient()
    .from("dishes")
    .select("id, categories!inner(slug)", { count: "exact", head: true })
    .neq("categories.slug", DRINKS_SLUG);
  if (error || count === null) {
    throw new Error(`getRecipeCount: ${error?.message ?? "no count"}`);
  }
  return count;
}

export async function getLocations(): Promise<Location[]> {
  "use cache";
  cacheLife("hours");
  const { data, error } = await createClient()
    .from("locations")
    .select("*, image:images(*)")
    // Deck order puts Uling Downtown first. A `sort` column would be sturdier.
    .order("name", { ascending: false });
  if (error) throw new Error(`getLocations: ${error.message}`);
  return data.map(toLocation);
}

export async function getLocation(slug: string): Promise<Location | null> {
  "use cache";
  cacheLife("hours");
  const { data, error } = await createClient()
    .from("locations")
    .select("*, image:images(*)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getLocation: ${error.message}`);
  return data ? toLocation(data) : null;
}

/** For `generateStaticParams` on /locations/[slug] and the sitemap. */
export async function getLocationSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  const { data, error } = await createClient().from("locations").select("slug");
  if (error) throw new Error(`getLocationSlugs: ${error.message}`);
  return data.map((row) => row.slug);
}

export async function getPackages(type: PackageType): Promise<Pkg[]> {
  "use cache";
  cacheLife("hours");
  const { data, error } = await createClient()
    .from("packages")
    .select("*")
    .eq("type", type)
    .order("sort");
  if (error) throw new Error(`getPackages: ${error.message}`);
  return data;
}

export async function getFaqs(): Promise<Faq[]> {
  "use cache";
  cacheLife("hours");
  const { data, error } = await createClient().from("faqs").select("*").order("sort");
  if (error) throw new Error(`getFaqs: ${error.message}`);
  return data;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");
  const { data, error } = await createClient()
    .from("testimonials")
    .select("*")
    .order("sort");
  if (error) throw new Error(`getTestimonials: ${error.message}`);
  return data;
}

/** Every logged image, for the /credits page. */
export async function getImages(): Promise<Image[]> {
  "use cache";
  cacheLife("hours");
  const { data, error } = await createClient().from("images").select("*").order("path");
  if (error) throw new Error(`getImages: ${error.message}`);
  return data;
}
