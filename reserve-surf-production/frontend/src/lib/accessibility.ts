import { clsx, type ClassValue } from "clsx";

/**
 * WCAG color contrast ratio calculation
 */
export const getContrastRatio = (foreground: string, background: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0;
    
    const [r, g, b] = rgb.map(Number).map(val => {
      const normalized = val / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if contrast meets WCAG standards
 */
export const meetsWCAG = (
  ratio: number,
  level: 'AA' | 'AAA' = 'AA',
  largeText: boolean = false
): boolean => {
  if (level === 'AA') {
    return largeText ? ratio >= 3 : ratio >= 4.5;
  }
  return largeText ? ratio >= 4.5 : ratio >= 7;
};

/**
 * Generate unique IDs for ARIA relationships
 */
export const generateAriaId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Focus management utilities
 */
export const focusUtils = {
  // Get all focusable elements within a container
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');
    
    return Array.from(container.querySelectorAll<HTMLElement>(selector));
  },

  // Save and restore focus
  saveFocus: () => document.activeElement as HTMLElement,
  
  restoreFocus: (element: HTMLElement | null) => {
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  },

  // Move focus to first error in form
  focusFirstError: (container: HTMLElement) => {
    const firstError = container.querySelector<HTMLElement>(
      '[aria-invalid="true"], .error'
    );
    if (firstError) {
      firstError.focus();
      return true;
    }
    return false;
  },
};

/**
 * Screen reader announcement utilities
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.style.width = '1px';
  announcement.style.height = '1px';
  announcement.style.overflow = 'hidden';
  
  document.body.appendChild(announcement);
  announcement.textContent = message;
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Keyboard navigation helpers
 */
export const keyboardNavigation = {
  isNavigationKey: (key: string): boolean => {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(key);
  },

  isActionKey: (key: string): boolean => {
    return ['Enter', ' '].includes(key);
  },

  handleGridNavigation: (
    event: KeyboardEvent,
    currentIndex: number,
    totalItems: number,
    columns: number,
    onNavigate: (newIndex: number) => void
  ) => {
    let newIndex = currentIndex;
    const rows = Math.ceil(totalItems / columns);
    const currentRow = Math.floor(currentIndex / columns);
    const currentCol = currentIndex % columns;

    switch (event.key) {
      case 'ArrowRight':
        if (currentCol < columns - 1 && currentIndex < totalItems - 1) {
          newIndex = currentIndex + 1;
        }
        break;
      case 'ArrowLeft':
        if (currentCol > 0) {
          newIndex = currentIndex - 1;
        }
        break;
      case 'ArrowDown':
        if (currentRow < rows - 1 && currentIndex + columns < totalItems) {
          newIndex = currentIndex + columns;
        }
        break;
      case 'ArrowUp':
        if (currentRow > 0) {
          newIndex = currentIndex - columns;
        }
        break;
      case 'Home':
        newIndex = currentRow * columns;
        break;
      case 'End':
        newIndex = Math.min(
          (currentRow + 1) * columns - 1,
          totalItems - 1
        );
        break;
      case 'PageUp':
        newIndex = currentCol;
        break;
      case 'PageDown':
        newIndex = Math.min(
          (rows - 1) * columns + currentCol,
          totalItems - 1
        );
        break;
    }

    if (newIndex !== currentIndex) {
      event.preventDefault();
      onNavigate(newIndex);
    }
  },
};

/**
 * ARIA attribute builders
 */
export const ariaProps = {
  button: (
    label: string,
    options?: {
      pressed?: boolean;
      expanded?: boolean;
      controls?: string;
      describedBy?: string;
      hasPopup?: boolean;
    }
  ) => {
    const props: Record<string, any> = {
      'aria-label': label,
    };

    if (options?.pressed !== undefined) {
      props['aria-pressed'] = options.pressed;
    }
    if (options?.expanded !== undefined) {
      props['aria-expanded'] = options.expanded;
    }
    if (options?.controls) {
      props['aria-controls'] = options.controls;
    }
    if (options?.describedBy) {
      props['aria-describedby'] = options.describedBy;
    }
    if (options?.hasPopup) {
      props['aria-haspopup'] = 'true';
    }

    return props;
  },

  input: (
    label: string,
    options?: {
      required?: boolean;
      invalid?: boolean;
      describedBy?: string;
      errorMessage?: string;
    }
  ) => {
    const props: Record<string, any> = {
      'aria-label': label,
    };

    if (options?.required) {
      props['aria-required'] = 'true';
    }
    if (options?.invalid) {
      props['aria-invalid'] = 'true';
    }
    if (options?.describedBy) {
      props['aria-describedby'] = options.describedBy;
    }
    if (options?.errorMessage) {
      props['aria-errormessage'] = options.errorMessage;
    }

    return props;
  },

  region: (
    label: string,
    options?: {
      busy?: boolean;
      current?: string;
      live?: 'polite' | 'assertive' | 'off';
    }
  ) => {
    const props: Record<string, any> = {
      'aria-label': label,
    };

    if (options?.busy) {
      props['aria-busy'] = 'true';
    }
    if (options?.current) {
      props['aria-current'] = options.current;
    }
    if (options?.live) {
      props['aria-live'] = options.live;
    }

    return props;
  },
};

/**
 * Visual focus indicator styles
 */
export const focusStyles = (...classes: ClassValue[]) => {
  return clsx(
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-primary',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-offset-background',
    ...classes
  );
};

/**
 * Skip link component props
 */
export const skipLinkProps = (target: string = '#main-content') => ({
  href: target,
  className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-background text-foreground p-2 rounded-md',
  children: 'Skip to main content',
});

/**
 * Semantic HTML helpers
 */
export const semanticElements = {
  isInteractive: (element: Element): boolean => {
    const interactiveTags = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
    return interactiveTags.includes(element.tagName) ||
           element.hasAttribute('tabindex') ||
           element.hasAttribute('contenteditable');
  },

  hasSemanticRole: (element: Element): boolean => {
    return element.hasAttribute('role') ||
           ['NAV', 'MAIN', 'HEADER', 'FOOTER', 'ARTICLE', 'SECTION'].includes(element.tagName);
  },
};