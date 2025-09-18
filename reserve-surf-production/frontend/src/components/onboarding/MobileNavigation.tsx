import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  ClipboardCheck, 
  Shield, 
  Target, 
  Calendar, 
  CreditCard,
  CheckCircle,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { IconButton } from '@/components/ui/icon-button';
import { motion, useAnimation } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useOnboardingStore } from '@/store/onboarding/onboardingStore';
import type { OnboardingStep } from '@/types/onboarding';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  step: OnboardingStep;
}

const navigationItems: NavigationItem[] = [
  { id: 'welcome', label: 'Welcome', icon: Home, path: '/onboarding', step: 'welcome' },
  { id: 'auth', label: 'Sign Up', icon: User, path: '/onboarding/auth', step: 'auth' },
  { id: 'assessment', label: 'Assessment', icon: ClipboardCheck, path: '/onboarding/assessment', step: 'assessment' },
  { id: 'profile', label: 'Profile', icon: User, path: '/onboarding/profile', step: 'profile' },
  { id: 'waiver', label: 'Legal', icon: Shield, path: '/onboarding/waiver', step: 'waiver' },
  { id: 'emergency', label: 'Emergency', icon: User, path: '/onboarding/emergency', step: 'emergency' },
  { id: 'recommendations', label: 'Lessons', icon: Target, path: '/onboarding/recommendations', step: 'recommendations' },
  { id: 'booking', label: 'Schedule', icon: Calendar, path: '/onboarding/booking', step: 'booking' },
  { id: 'payment', label: 'Payment', icon: CreditCard, path: '/onboarding/payment', step: 'payment' },
  { id: 'confirmation', label: 'Confirm', icon: CheckCircle, path: '/onboarding/confirmation', step: 'confirmation' },
];

export function MobileNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentStep, completedSteps, setCurrentStep } = useOnboardingStore();
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getCurrentStepIndex = () => {
    const item = navigationItems.find(item => location.pathname === item.path);
    return item ? navigationItems.indexOf(item) : 0;
  };

  const canNavigateTo = (step: OnboardingStep) => {
    const stepIndex = navigationItems.findIndex(item => item.step === step);
    const currentIndex = navigationItems.findIndex(item => item.step === currentStep);
    return stepIndex === 0 || stepIndex <= currentIndex || completedSteps.includes(navigationItems[stepIndex - 1]?.step);
  };

  const handleNavigation = (item: NavigationItem) => {
    if (canNavigateTo(item.step)) {
      setCurrentStep(item.step);
      navigate(item.path);
    }
  };

  const handleSwipe = (_event: any, info: PanInfo) => {
    const threshold = 50;
    const currentIndex = getCurrentStepIndex();
    
    if (info.offset.x > threshold && currentIndex > 0) {
      const prevItem = navigationItems[currentIndex - 1];
      if (canNavigateTo(prevItem.step)) {
        handleNavigation(prevItem);
      }
    } else if (info.offset.x < -threshold && currentIndex < navigationItems.length - 1) {
      const nextItem = navigationItems[currentIndex + 1];
      if (canNavigateTo(nextItem.step)) {
        handleNavigation(nextItem);
      }
    }
  };

  const handleStepNavigation = (direction: 'prev' | 'next') => {
    const currentIndex = getCurrentStepIndex();
    
    if (direction === 'prev' && currentIndex > 0) {
      const prevItem = navigationItems[currentIndex - 1];
      if (canNavigateTo(prevItem.step)) {
        handleNavigation(prevItem);
      }
    } else if (direction === 'next' && currentIndex < navigationItems.length - 1) {
      const nextItem = navigationItems[currentIndex + 1];
      if (canNavigateTo(nextItem.step)) {
        handleNavigation(nextItem);
      }
    }
  };

  if (!isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4 bg-gradient-to-t from-background/80 to-transparent backdrop-blur-sm md:hidden">
        <Dock className="mx-auto" magnification={60} distance={100}>
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isCompleted = completedSteps.includes(item.step);
            const isDisabled = !canNavigateTo(item.step);
            
            return (
              <DockItem key={item.id}>
                <DockLabel>{item.label}</DockLabel>
                <DockIcon>
                  <button
                    onClick={() => handleNavigation(item)}
                    disabled={isDisabled}
                    className={cn(
                      'relative transition-all duration-200',
                      isDisabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    <item.icon 
                      className={cn(
                        'h-6 w-6',
                        isActive && 'text-primary',
                        isCompleted && !isActive && 'text-accent'
                      )}
                    />
                    {isCompleted && (
                      <CheckCircle className="absolute -top-1 -right-1 h-3 w-3 text-accent" />
                    )}
                  </button>
                </DockIcon>
              </DockItem>
            );
          })}
        </Dock>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 md:hidden"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleSwipe}
        animate={controls}
      />
      
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-background/95 backdrop-blur-md border-t border-border">
          <div className="flex items-center justify-between px-2 py-1">
            <IconButton
              icon={ChevronLeft}
              onClick={() => handleStepNavigation('prev')}
              disabled={getCurrentStepIndex() === 0}
              size="md"
              className="min-w-[44px] min-h-[44px]"
              aria-label="Previous step"
            />
            
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex justify-center gap-1 px-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const isCompleted = completedSteps.includes(item.step);
                  const isDisabled = !canNavigateTo(item.step);
                  
                  return (
                    <IconButton
                      key={item.id}
                      icon={item.icon}
                      onClick={() => handleNavigation(item)}
                      disabled={isDisabled}
                      active={isActive}
                      size="lg"
                      className={cn(
                        'min-w-[48px] min-h-[48px] transition-all',
                        isDisabled && 'opacity-40',
                        isCompleted && !isActive && 'bg-accent/10'
                      )}
                      color={isActive ? [255, 165, 0] : isCompleted ? [34, 197, 94] : [156, 163, 175]}
                      aria-label={item.label}
                    />
                  );
                })}
              </div>
            </div>
            
            <IconButton
              icon={ChevronRight}
              onClick={() => handleStepNavigation('next')}
              disabled={getCurrentStepIndex() === navigationItems.length - 1 || (getCurrentStepIndex() < navigationItems.length - 1 && !canNavigateTo(navigationItems[getCurrentStepIndex() + 1].step))}
              size="md"
              className="min-w-[44px] min-h-[44px]"
              aria-label="Next step"
            />
          </div>
          
          <div className="px-4 pb-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Step {getCurrentStepIndex() + 1} of {navigationItems.length}
              </span>
              <span className="text-xs font-medium">
                {navigationItems[getCurrentStepIndex()]?.label}
              </span>
            </div>
            <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${((getCurrentStepIndex() + 1) / navigationItems.length) * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}