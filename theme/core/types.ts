// @ts-nocheck
// Supabase configuration
export interface SupabaseConfig {
<<<<<<< HEAD
  url: string;
  anonKey: string;
}

// Auth module configuration
export interface AuthConfig {
  enabled?: boolean;
  profileTableName?: string;
  autoCreateProfile?: boolean;
}

// Future module configuration interfaces
export interface PaymentsConfig {
  enabled?: boolean;
  stripePublishableKey?: string;
}

export interface StorageConfig {
  enabled?: boolean;
  defaultBucket?: string;
}

// Module configuration union type
export interface ModuleConfig {
  auth?: AuthConfig | false;
  payments?: PaymentsConfig | false;
  storage?: StorageConfig | false;
}

// Main configuration interface
export interface OnSpaceConfig extends ModuleConfig {
  supabase: SupabaseConfig;
}

// Runtime state
export interface SDKState {
  initialized: boolean;
  enabledModules: string[];
  config: OnSpaceConfig;
}

// Error type
export interface OnSpaceError {
  code: string;
  message: string;
  module?: string;
  details?: any;
}
=======
    url: string;
    anonKey: string;
  }
  
  // Auth module configuration
  export interface AuthConfig {
    enabled?: boolean;
    profileTableName?: string;
    autoCreateProfile?: boolean;
  }
  
  // Future module configuration interfaces
  export interface PaymentsConfig {
    enabled?: boolean;
    stripePublishableKey?: string;
  }
  
  export interface StorageConfig {
    enabled?: boolean;
    defaultBucket?: string;
  }
  
  // Module configuration union type
  export interface ModuleConfig {
    auth?: AuthConfig | false;
    payments?: PaymentsConfig | false;
    storage?: StorageConfig | false;
  }
  
  // Main configuration interface
  export interface OnSpaceConfig extends ModuleConfig {
    supabase: SupabaseConfig;
  }
  
  // Runtime state
  export interface SDKState {
    initialized: boolean;
    enabledModules: string[];
    config: OnSpaceConfig;
  }
  
  // Error type
  export interface OnSpaceError {
    code: string;
    message: string;
    module?: string;
    details?: any;
  }
>>>>>>> fa1781c314271bc6225f3f556fc8cc84d76e834a
