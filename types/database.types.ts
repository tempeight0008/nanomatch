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
        PostgrestVersion: "14.5"
    }
    public: {
        Tables: {
            businesses: {
                Row: {
                    city: string
                    company_name: string
                    id: string
                    stripe_customer_id: string | null
                    updated_at: string
                    website: string | null
                }
                Insert: {
                    city: string
                    company_name: string
                    id: string
                    stripe_customer_id?: string | null
                    updated_at?: string
                    website?: string | null
                }
                Update: {
                    city?: string
                    company_name?: string
                    id?: string
                    stripe_customer_id?: string | null
                    updated_at?: string
                    website?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "businesses_id_fkey"
                        columns: ["id"]
                        isOneToOne: true
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            creators: {
                Row: {
                    bio: string | null
                    city: string
                    engagement_rate: number | null
                    follower_count: number | null
                    id: string
                    ig_handle: string | null
                    niche: string
                    stripe_account_id: string | null
                    tiktok_handle: string | null
                    updated_at: string
                }
                Insert: {
                    bio?: string | null
                    city: string
                    engagement_rate?: number | null
                    follower_count?: number | null
                    id: string
                    ig_handle?: string | null
                    niche: string
                    stripe_account_id?: string | null
                    tiktok_handle?: string | null
                    updated_at?: string
                }
                Update: {
                    bio?: string | null
                    city?: string
                    engagement_rate?: number | null
                    follower_count?: number | null
                    id?: string
                    ig_handle?: string | null
                    niche?: string
                    stripe_account_id?: string | null
                    tiktok_handle?: string | null
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "creators_id_fkey"
                        columns: ["id"]
                        isOneToOne: true
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    },
                ]
            }
            deals: {
                Row: {
                    amount: number
                    business_id: string
                    created_at: string
                    creator_id: string
                    deliverables: string
                    id: string
                    status: Database["public"]["Enums"]["deal_status"]
                    stripe_payment_intent: string | null
                    updated_at: string
                }
                Insert: {
                    amount: number
                    business_id: string
                    created_at?: string
                    creator_id: string
                    deliverables: string
                    id?: string
                    status?: Database["public"]["Enums"]["deal_status"]
                    stripe_payment_intent?: string | null
                    updated_at?: string
                }
                Update: {
                    amount?: number
                    business_id?: string
                    created_at?: string
                    creator_id?: string
                    deliverables?: string
                    id?: string
                    status?: Database["public"]["Enums"]["deal_status"]
                    stripe_payment_intent?: string | null
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "deals_business_id_fkey"
                        columns: ["business_id"]
                        isOneToOne: false
                        referencedRelation: "businesses"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "deals_creator_id_fkey"
                        columns: ["creator_id"]
                        isOneToOne: false
                        referencedRelation: "creators"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string
                    full_name: string
                    id: string
                    role: Database["public"]["Enums"]["user_role"]
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string
                    full_name: string
                    id: string
                    role: Database["public"]["Enums"]["user_role"]
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string
                    full_name?: string
                    id?: string
                    role?: Database["public"]["Enums"]["user_role"]
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
            deal_status: "pending" | "accepted" | "completed" | "canceled"
            user_role: "creator" | "business"
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
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals
    }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {
            deal_status: ["pending", "accepted", "completed", "canceled"],
            user_role: ["creator", "business"],
        },
    },
} as const