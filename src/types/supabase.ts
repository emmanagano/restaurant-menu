export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string
          date: string
          email: string
          id: string
          location_id: string
          name: string
          notes: string | null
          party_size: number
          phone: string
          time: string
        }
        Insert: {
          created_at?: string
          date: string
          email: string
          id?: string
          location_id: string
          name: string
          notes?: string | null
          party_size: number
          phone: string
          time: string
        }
        Update: {
          created_at?: string
          date?: string
          email?: string
          id?: string
          location_id?: string
          name?: string
          notes?: string | null
          party_size?: number
          phone?: string
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          sort: number
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sort?: number
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sort?: number
        }
        Relationships: []
      }
      dishes: {
        Row: {
          alt: string | null
          category_id: string
          description: string
          id: string
          image_id: string | null
          is_signature: boolean
          name: string
          price_php: number
          slug: string
          sort: number
          tags: string[]
        }
        Insert: {
          alt?: string | null
          category_id: string
          description: string
          id?: string
          image_id?: string | null
          is_signature?: boolean
          name: string
          price_php: number
          slug: string
          sort?: number
          tags?: string[]
        }
        Update: {
          alt?: string | null
          category_id?: string
          description?: string
          id?: string
          image_id?: string | null
          is_signature?: boolean
          name?: string
          price_php?: number
          slug?: string
          sort?: number
          tags?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "dishes_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dishes_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      enquiries: {
        Row: {
          budget: string | null
          created_at: string
          email: string
          event_date: string | null
          guests: number | null
          id: string
          location: string | null
          message: string | null
          name: string
          phone: string | null
          type: string
        }
        Insert: {
          budget?: string | null
          created_at?: string
          email: string
          event_date?: string | null
          guests?: number | null
          id?: string
          location?: string | null
          message?: string | null
          name: string
          phone?: string | null
          type: string
        }
        Update: {
          budget?: string | null
          created_at?: string
          email?: string
          event_date?: string | null
          guests?: number | null
          id?: string
          location?: string | null
          message?: string | null
          name?: string
          phone?: string | null
          type?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          id: string
          question: string
          sort: number
        }
        Insert: {
          answer: string
          id?: string
          question: string
          sort?: number
        }
        Update: {
          answer?: string
          id?: string
          question?: string
          sort?: number
        }
        Relationships: []
      }
      images: {
        Row: {
          alt: string
          credit_line: string | null
          height: number
          id: string
          license: string | null
          path: string
          photographer: string | null
          source: string
          source_url: string | null
          width: number
        }
        Insert: {
          alt: string
          credit_line?: string | null
          height: number
          id?: string
          license?: string | null
          path: string
          photographer?: string | null
          source: string
          source_url?: string | null
          width: number
        }
        Update: {
          alt?: string
          credit_line?: string | null
          height?: number
          id?: string
          license?: string | null
          path?: string
          photographer?: string | null
          source?: string
          source_url?: string | null
          width?: number
        }
        Relationships: []
      }
      locations: {
        Row: {
          address: string
          barangay: string
          city: string
          feature: string | null
          hours: Json
          id: string
          image_id: string | null
          lat: number | null
          lng: number | null
          maps_url: string | null
          name: string
          parking: string | null
          phone: string
          region: string
          slug: string
        }
        Insert: {
          address: string
          barangay: string
          city: string
          feature?: string | null
          hours: Json
          id?: string
          image_id?: string | null
          lat?: number | null
          lng?: number | null
          maps_url?: string | null
          name: string
          parking?: string | null
          phone: string
          region: string
          slug: string
        }
        Update: {
          address?: string
          barangay?: string
          city?: string
          feature?: string | null
          hours?: Json
          id?: string
          image_id?: string | null
          lat?: number | null
          lng?: number | null
          maps_url?: string | null
          name?: string
          parking?: string | null
          phone?: string
          region?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          description: string | null
          id: string
          name: string
          price_note: string | null
          price_php: number | null
          sort: number
          type: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          price_note?: string | null
          price_php?: number | null
          sort?: number
          type: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          price_note?: string | null
          price_php?: number | null
          sort?: number
          type?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          id: string
          quote: string
          rating: number | null
          sort: number
          source_label: string | null
        }
        Insert: {
          author: string
          id?: string
          quote: string
          rating?: number | null
          sort?: number
          source_label?: string | null
        }
        Update: {
          author?: string
          id?: string
          quote?: string
          rating?: number | null
          sort?: number
          source_label?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
