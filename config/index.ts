interface Config {
    api: {
      baseUrl: string;
      timeout: number;
    };
    app: {
      name: string;
      version: string;
      environment: string;
      url: string;
    };
    auth: {
      tokenKey: string;
      refreshTokenKey: string;
      tokenExpiry: number;
    };
    upload: {
      maxSize: number;
      allowedTypes: string[];
    };
  }

  // Validate required environment variables
  const requiredEnvVars = {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  };

  // Check for missing environment variables
  const missingEnvVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingEnvVars.length > 0) {
    console.warn(
      `Missing environment variables: ${missingEnvVars.join(
        ", "
      )}. Using default values.`
    );
  }

  export const config: Config = {
    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5002/api/v1",
      timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000"),
    },
    app: {
      name: process.env.NEXT_PUBLIC_APP_NAME || "DarulQuran Foundation",
      version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3002",
    },
    auth: {
      tokenKey: "accessToken",
      refreshTokenKey: "refreshToken",
      tokenExpiry: parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRY || "3600"),
    },
    upload: {
      maxSize: parseInt(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE || "5242880"), // 5MB
      allowedTypes: (
        process.env.NEXT_PUBLIC_ALLOWED_FILE_TYPES || "jpg,jpeg,png,pdf,doc,docx"
      ).split(","),
    },
  };

  // Export individual config sections for convenience
  export const { api, app, auth, upload } = config;

  // Helper functions
  export const isDevelopment = () => config.app.environment === "development";
  export const isProduction = () => config.app.environment === "production";
  export const isTest = () => config.app.environment === "test";

  // API helper functions
  export const getApiUrl = (endpoint: string) =>
    `${config.api.baseUrl}${endpoint}`;
  export const getAuthHeaders = (token: string) => ({
    Authorization: token,
    "Content-Type": "application/json",
  });

  // Default export
  export default config;