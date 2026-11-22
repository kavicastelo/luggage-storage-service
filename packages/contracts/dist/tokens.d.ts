/**
 * Ceylon Warmth & Coastal Precision (CWCP) Design Foundation Tokens
 * Governing Document: DOC-UX-P2C-021 (Design Foundation Specification)
 *
 * Strict Single Source of Truth for Web, Mobile, and Test Suites.
 */
export interface TokenColorScale {
    readonly 50?: string;
    readonly 100?: string;
    readonly 200?: string;
    readonly 300?: string;
    readonly 400?: string;
    readonly 500: string;
    readonly 600?: string;
    readonly 700?: string;
    readonly 800?: string;
    readonly 900?: string;
    readonly 950?: string;
}
/**
 * 1. CWCP Raw Palette Tokens
 */
export declare const cwcpPalette: {
    readonly navy: {
        readonly 50: "#F2F5FA";
        readonly 100: "#E8EEF8";
        readonly 500: "#234694";
        readonly 600: "#1B3675";
        readonly 700: "#173054";
        readonly 800: "#132742";
        readonly 900: "#0A192F";
        readonly 950: "#070E1A";
    };
    readonly terracotta: {
        readonly 50: "#FFF5EF";
        readonly 100: "#FEE8D8";
        readonly 200: "#FBB78E";
        readonly 300: "#F28D52";
        readonly 400: "#E86F2C";
        readonly 500: "#C55013";
        readonly 600: "#B8460A";
        readonly 700: "#9E3708";
        readonly 800: "#7D2B06";
        readonly 900: "#5A1E04";
    };
    readonly sand: {
        readonly 50: "#FAF8F5";
        readonly 100: "#F3EFEA";
        readonly 200: "#E5DFD7";
        readonly 300: "#D1C7BB";
        readonly 400: "#BFB6AA";
        readonly 500: "#ABA296";
        readonly 600: "#8C8377";
        readonly 700: "#6B635A";
        readonly 800: "#4B453E";
        readonly 900: "#2E2A25";
    };
    readonly white: "#FFFFFF";
    readonly emerald: {
        readonly 50: "#ECFDF5";
        readonly 100: "#D1FAE5";
        readonly 500: "#10B981";
        readonly 600: "#059669";
        readonly 700: "#047857";
    };
    readonly amber: {
        readonly 50: "#FFFBEB";
        readonly 100: "#FEF3C7";
        readonly 500: "#F59E0B";
        readonly 600: "#D97706";
        readonly 700: "#B45309";
    };
    readonly rose: {
        readonly 50: "#FFF1F2";
        readonly 100: "#FFE4E6";
        readonly 500: "#F43F5E";
        readonly 600: "#E11D48";
        readonly 700: "#BE123C";
    };
    readonly sky: {
        readonly 50: "#F0F9FF";
        readonly 100: "#E0F2FE";
        readonly 500: "#0EA5E9";
        readonly 600: "#0284C7";
        readonly 700: "#0369A1";
    };
};
/**
 * 2. Semantic Roles & Intent Mappings
 */
export declare const cwcpSemanticRoles: {
    readonly surface: {
        readonly canvas: "#FAF8F5";
        readonly container: "#F3EFEA";
        readonly card: "#FFFFFF";
        readonly elevated: "#FFFFFF";
        readonly divider: "#E5DFD7";
        readonly border: "#E5DFD7";
        readonly borderFocus: "#E86F2C";
        readonly borderDisabled: "#D1C7BB";
    };
    readonly text: {
        readonly primary: "#070E1A";
        readonly secondary: "#6B635A";
        readonly muted: "#ABA296";
        readonly inverse: "#FFFFFF";
        readonly brand: "#B8460A";
    };
    readonly action: {
        readonly primaryBg: "#C55013";
        readonly primaryHover: "#B8460A";
        readonly primaryActive: "#9E3708";
        readonly primaryText: "#FFFFFF";
        readonly secondaryBg: "#0A192F";
        readonly secondaryHover: "#132742";
        readonly secondaryActive: "#070E1A";
        readonly secondaryText: "#FFFFFF";
        readonly ghostHover: "#F3EFEA";
        readonly ghostText: "#0A192F";
    };
    readonly status: {
        readonly success: "#059669";
        readonly successBg: "#ECFDF5";
        readonly successBorder: "#D1FAE5";
        readonly warning: "#D97706";
        readonly warningBg: "#FFFBEB";
        readonly warningBorder: "#FEF3C7";
        readonly danger: "#E11D48";
        readonly dangerBg: "#FFF1F2";
        readonly dangerBorder: "#FFE4E6";
        readonly info: "#0284C7";
        readonly infoBg: "#F0F9FF";
        readonly infoBorder: "#E0F2FE";
    };
};
/**
 * 3. Typography Scale
 */
export declare const cwcpTypography: {
    readonly fontFamily: {
        readonly sans: "Plus Jakarta Sans, Inter, system-ui, -apple-system, sans-serif";
        readonly mono: "JetBrains Mono, Roboto Mono, monospace";
    };
    readonly displayLg: {
        readonly fontSize: "2.5rem";
        readonly lineHeight: "3rem";
        readonly fontWeight: "800";
        readonly letterSpacing: "-0.02em";
    };
    readonly displaySm: {
        readonly fontSize: "2rem";
        readonly lineHeight: "2.5rem";
        readonly fontWeight: "700";
        readonly letterSpacing: "-0.015em";
    };
    readonly headingLg: {
        readonly fontSize: "1.5rem";
        readonly lineHeight: "2rem";
        readonly fontWeight: "700";
        readonly letterSpacing: "-0.01em";
    };
    readonly headingMd: {
        readonly fontSize: "1.25rem";
        readonly lineHeight: "1.75rem";
        readonly fontWeight: "600";
    };
    readonly headingSm: {
        readonly fontSize: "1rem";
        readonly lineHeight: "1.5rem";
        readonly fontWeight: "600";
    };
    readonly bodyLg: {
        readonly fontSize: "1rem";
        readonly lineHeight: "1.5rem";
        readonly fontWeight: "400";
    };
    readonly bodyMd: {
        readonly fontSize: "0.875rem";
        readonly lineHeight: "1.25rem";
        readonly fontWeight: "400";
    };
    readonly bodySm: {
        readonly fontSize: "0.75rem";
        readonly lineHeight: "1rem";
        readonly fontWeight: "500";
    };
    readonly codeMono: {
        readonly fontSize: "0.875rem";
        readonly lineHeight: "1.25rem";
        readonly fontWeight: "600";
        readonly fontFamily: "JetBrains Mono, Roboto Mono, monospace";
    };
};
/**
 * 4. Spacing Scale (4px Spatial Baseline)
 */
export declare const cwcpSpacing: {
    readonly 0: "0px";
    readonly 1: "4px";
    readonly 2: "8px";
    readonly 3: "12px";
    readonly 4: "16px";
    readonly 5: "20px";
    readonly 6: "24px";
    readonly 8: "32px";
    readonly 10: "40px";
    readonly 12: "48px";
    readonly 16: "64px";
    readonly 20: "80px";
    readonly 24: "96px";
};
/**
 * 5. Shape & Border Radius Tokens
 */
export declare const cwcpRadius: {
    readonly none: "0px";
    readonly sm: "6px";
    readonly md: "8px";
    readonly lg: "12px";
    readonly xl: "16px";
    readonly '2xl': "24px";
    readonly full: "9999px";
};
/**
 * 6. Elevation & Shadows (with Coastal Navy tint)
 */
export declare const cwcpElevation: {
    readonly sm: "0 1px 2px 0 rgba(10, 25, 47, 0.05)";
    readonly md: "0 4px 6px -1px rgba(10, 25, 47, 0.08), 0 2px 4px -2px rgba(10, 25, 47, 0.05)";
    readonly lg: "0 10px 15px -3px rgba(10, 25, 47, 0.10), 0 4px 6px -4px rgba(10, 25, 47, 0.05)";
    readonly xl: "0 20px 25px -5px rgba(10, 25, 47, 0.12), 0 8px 10px -6px rgba(10, 25, 47, 0.06)";
};
/**
 * 7. Interaction States & Ergonomic Touch Minimums
 */
export declare const cwcpInteraction: {
    readonly touchTargetMin: "44px";
    readonly focusRing: "0 0 0 2px #FAF8F5, 0 0 0 4px #C55013";
    readonly transitionDefault: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)";
};
/**
 * Consolidated Design System Export
 */
export declare const cwcpTokens: {
    readonly palette: {
        readonly navy: {
            readonly 50: "#F2F5FA";
            readonly 100: "#E8EEF8";
            readonly 500: "#234694";
            readonly 600: "#1B3675";
            readonly 700: "#173054";
            readonly 800: "#132742";
            readonly 900: "#0A192F";
            readonly 950: "#070E1A";
        };
        readonly terracotta: {
            readonly 50: "#FFF5EF";
            readonly 100: "#FEE8D8";
            readonly 200: "#FBB78E";
            readonly 300: "#F28D52";
            readonly 400: "#E86F2C";
            readonly 500: "#C55013";
            readonly 600: "#B8460A";
            readonly 700: "#9E3708";
            readonly 800: "#7D2B06";
            readonly 900: "#5A1E04";
        };
        readonly sand: {
            readonly 50: "#FAF8F5";
            readonly 100: "#F3EFEA";
            readonly 200: "#E5DFD7";
            readonly 300: "#D1C7BB";
            readonly 400: "#BFB6AA";
            readonly 500: "#ABA296";
            readonly 600: "#8C8377";
            readonly 700: "#6B635A";
            readonly 800: "#4B453E";
            readonly 900: "#2E2A25";
        };
        readonly white: "#FFFFFF";
        readonly emerald: {
            readonly 50: "#ECFDF5";
            readonly 100: "#D1FAE5";
            readonly 500: "#10B981";
            readonly 600: "#059669";
            readonly 700: "#047857";
        };
        readonly amber: {
            readonly 50: "#FFFBEB";
            readonly 100: "#FEF3C7";
            readonly 500: "#F59E0B";
            readonly 600: "#D97706";
            readonly 700: "#B45309";
        };
        readonly rose: {
            readonly 50: "#FFF1F2";
            readonly 100: "#FFE4E6";
            readonly 500: "#F43F5E";
            readonly 600: "#E11D48";
            readonly 700: "#BE123C";
        };
        readonly sky: {
            readonly 50: "#F0F9FF";
            readonly 100: "#E0F2FE";
            readonly 500: "#0EA5E9";
            readonly 600: "#0284C7";
            readonly 700: "#0369A1";
        };
    };
    readonly roles: {
        readonly surface: {
            readonly canvas: "#FAF8F5";
            readonly container: "#F3EFEA";
            readonly card: "#FFFFFF";
            readonly elevated: "#FFFFFF";
            readonly divider: "#E5DFD7";
            readonly border: "#E5DFD7";
            readonly borderFocus: "#E86F2C";
            readonly borderDisabled: "#D1C7BB";
        };
        readonly text: {
            readonly primary: "#070E1A";
            readonly secondary: "#6B635A";
            readonly muted: "#ABA296";
            readonly inverse: "#FFFFFF";
            readonly brand: "#B8460A";
        };
        readonly action: {
            readonly primaryBg: "#C55013";
            readonly primaryHover: "#B8460A";
            readonly primaryActive: "#9E3708";
            readonly primaryText: "#FFFFFF";
            readonly secondaryBg: "#0A192F";
            readonly secondaryHover: "#132742";
            readonly secondaryActive: "#070E1A";
            readonly secondaryText: "#FFFFFF";
            readonly ghostHover: "#F3EFEA";
            readonly ghostText: "#0A192F";
        };
        readonly status: {
            readonly success: "#059669";
            readonly successBg: "#ECFDF5";
            readonly successBorder: "#D1FAE5";
            readonly warning: "#D97706";
            readonly warningBg: "#FFFBEB";
            readonly warningBorder: "#FEF3C7";
            readonly danger: "#E11D48";
            readonly dangerBg: "#FFF1F2";
            readonly dangerBorder: "#FFE4E6";
            readonly info: "#0284C7";
            readonly infoBg: "#F0F9FF";
            readonly infoBorder: "#E0F2FE";
        };
    };
    readonly typography: {
        readonly fontFamily: {
            readonly sans: "Plus Jakarta Sans, Inter, system-ui, -apple-system, sans-serif";
            readonly mono: "JetBrains Mono, Roboto Mono, monospace";
        };
        readonly displayLg: {
            readonly fontSize: "2.5rem";
            readonly lineHeight: "3rem";
            readonly fontWeight: "800";
            readonly letterSpacing: "-0.02em";
        };
        readonly displaySm: {
            readonly fontSize: "2rem";
            readonly lineHeight: "2.5rem";
            readonly fontWeight: "700";
            readonly letterSpacing: "-0.015em";
        };
        readonly headingLg: {
            readonly fontSize: "1.5rem";
            readonly lineHeight: "2rem";
            readonly fontWeight: "700";
            readonly letterSpacing: "-0.01em";
        };
        readonly headingMd: {
            readonly fontSize: "1.25rem";
            readonly lineHeight: "1.75rem";
            readonly fontWeight: "600";
        };
        readonly headingSm: {
            readonly fontSize: "1rem";
            readonly lineHeight: "1.5rem";
            readonly fontWeight: "600";
        };
        readonly bodyLg: {
            readonly fontSize: "1rem";
            readonly lineHeight: "1.5rem";
            readonly fontWeight: "400";
        };
        readonly bodyMd: {
            readonly fontSize: "0.875rem";
            readonly lineHeight: "1.25rem";
            readonly fontWeight: "400";
        };
        readonly bodySm: {
            readonly fontSize: "0.75rem";
            readonly lineHeight: "1rem";
            readonly fontWeight: "500";
        };
        readonly codeMono: {
            readonly fontSize: "0.875rem";
            readonly lineHeight: "1.25rem";
            readonly fontWeight: "600";
            readonly fontFamily: "JetBrains Mono, Roboto Mono, monospace";
        };
    };
    readonly spacing: {
        readonly 0: "0px";
        readonly 1: "4px";
        readonly 2: "8px";
        readonly 3: "12px";
        readonly 4: "16px";
        readonly 5: "20px";
        readonly 6: "24px";
        readonly 8: "32px";
        readonly 10: "40px";
        readonly 12: "48px";
        readonly 16: "64px";
        readonly 20: "80px";
        readonly 24: "96px";
    };
    readonly radius: {
        readonly none: "0px";
        readonly sm: "6px";
        readonly md: "8px";
        readonly lg: "12px";
        readonly xl: "16px";
        readonly '2xl': "24px";
        readonly full: "9999px";
    };
    readonly elevation: {
        readonly sm: "0 1px 2px 0 rgba(10, 25, 47, 0.05)";
        readonly md: "0 4px 6px -1px rgba(10, 25, 47, 0.08), 0 2px 4px -2px rgba(10, 25, 47, 0.05)";
        readonly lg: "0 10px 15px -3px rgba(10, 25, 47, 0.10), 0 4px 6px -4px rgba(10, 25, 47, 0.05)";
        readonly xl: "0 20px 25px -5px rgba(10, 25, 47, 0.12), 0 8px 10px -6px rgba(10, 25, 47, 0.06)";
    };
    readonly interaction: {
        readonly touchTargetMin: "44px";
        readonly focusRing: "0 0 0 2px #FAF8F5, 0 0 0 4px #C55013";
        readonly transitionDefault: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)";
    };
};
/**
 * Contrast Calculation & WCAG Validation Utilities
 * Formula per WCAG 2.2 Relative Luminance & Contrast Ratio
 */
export declare function srgbChannelToLinear(channel8Bit: number): number;
export declare function parseHexColor(hex: string): {
    r: number;
    g: number;
    b: number;
};
export declare function getRelativeLuminance(hex: string): number;
export declare function calculateContrastRatio(foregroundHex: string, backgroundHex: string): number;
export declare function passesWcagAA(foregroundHex: string, backgroundHex: string, isLargeText?: boolean): boolean;
//# sourceMappingURL=tokens.d.ts.map