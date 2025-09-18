import { useState, useEffect } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  WifiOff, 
  ServerCrash, 
  ShieldAlert, 
  AlertTriangle, 
  RefreshCw, 
  ArrowLeft, 
  Home,
  CheckCircle2,
  XCircle,
  Loader2,
  Info,
  Mail,
  Phone
} from 'lucide-react'

export type ErrorType = 'network' | 'auth' | 'validation' | 'server' | 'timeout' | 'unknown'

interface ErrorRecoveryProps {
  error: Error | null
  errorType?: ErrorType
  onRetry?: () => void | Promise<void>
  onGoBack?: () => void
  onGoHome?: () => void
  retryCount?: number
  maxRetries?: number
  autoRetryDelay?: number
  showContactSupport?: boolean
}

export function ErrorRecovery({
  error,
  errorType = 'unknown',
  onRetry,
  onGoBack,
  onGoHome,
  retryCount = 0,
  maxRetries = 3,
  autoRetryDelay = 0,
  showContactSupport = true
}: ErrorRecoveryProps) {
  const [isRetrying, setIsRetrying] = useState(false)
  const [countdown, setCountdown] = useState(autoRetryDelay / 1000)
  const [autoRetryTimer, setAutoRetryTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (autoRetryDelay > 0 && retryCount < maxRetries && onRetry) {
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            handleRetry()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      setAutoRetryTimer(interval)

      return () => {
        if (interval) clearInterval(interval)
      }
    }
  }, [autoRetryDelay, retryCount, maxRetries])

  const handleRetry = async () => {
    if (autoRetryTimer) {
      clearTimeout(autoRetryTimer)
      setAutoRetryTimer(null)
    }
    
    if (onRetry) {
      setIsRetrying(true)
      try {
        await onRetry()
      } finally {
        setIsRetrying(false)
        setCountdown(autoRetryDelay / 1000)
      }
    }
  }

  const getErrorIcon = () => {
    switch (errorType) {
      case 'network':
        return <WifiOff className="h-12 w-12 text-destructive" />
      case 'auth':
        return <ShieldAlert className="h-12 w-12 text-destructive" />
      case 'server':
        return <ServerCrash className="h-12 w-12 text-destructive" />
      case 'validation':
        return <XCircle className="h-12 w-12 text-yellow-500" />
      case 'timeout':
        return <AlertTriangle className="h-12 w-12 text-yellow-500" />
      default:
        return <AlertTriangle className="h-12 w-12 text-destructive" />
    }
  }

  const getErrorTitle = () => {
    switch (errorType) {
      case 'network':
        return 'Connection Error'
      case 'auth':
        return 'Authentication Error'
      case 'server':
        return 'Server Error'
      case 'validation':
        return 'Validation Error'
      case 'timeout':
        return 'Request Timeout'
      default:
        return 'Something Went Wrong'
    }
  }

  const getErrorMessage = () => {
    switch (errorType) {
      case 'network':
        return 'Unable to connect to our servers. Please check your internet connection and try again.'
      case 'auth':
        return 'Your session has expired or you need to log in again to continue.'
      case 'server':
        return 'Our servers are experiencing issues. Our team has been notified and is working on a fix.'
      case 'validation':
        return 'Some of the information provided is invalid. Please check your input and try again.'
      case 'timeout':
        return 'The request took too long to complete. Please try again.'
      default:
        return error?.message || 'An unexpected error occurred. Please try again or contact support if the problem persists.'
    }
  }

  const getSuggestedActions = () => {
    const actions = []
    
    switch (errorType) {
      case 'network':
        actions.push('Check your internet connection')
        actions.push('Try disabling VPN or proxy')
        actions.push('Refresh the page')
        break
      case 'auth':
        actions.push('Log in again')
        actions.push('Clear browser cookies')
        actions.push('Try a different browser')
        break
      case 'server':
        actions.push('Wait a few minutes')
        actions.push('Try again later')
        actions.push('Contact support if urgent')
        break
      case 'validation':
        actions.push('Review your input')
        actions.push('Check required fields')
        actions.push('Verify data formats')
        break
      case 'timeout':
        actions.push('Check your connection speed')
        actions.push('Try a simpler request')
        actions.push('Retry the operation')
        break
    }
    
    return actions
  }

  const canRetry = retryCount < maxRetries && onRetry

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {getErrorIcon()}
        </div>
        <CardTitle className="text-2xl">{getErrorTitle()}</CardTitle>
        <CardDescription className="text-base mt-2">
          {getErrorMessage()}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Retry Progress */}
        {retryCount > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Retry Attempts</span>
              <span className={retryCount >= maxRetries ? 'text-destructive' : ''}>
                {retryCount} / {maxRetries}
              </span>
            </div>
            <Progress value={(retryCount / maxRetries) * 100} className="h-2" />
          </div>
        )}

        {/* Auto Retry Countdown */}
        {countdown > 0 && canRetry && (
          <Alert>
            <RefreshCw className="h-4 w-4 animate-spin" />
            <AlertTitle>Auto-retrying in {countdown} seconds...</AlertTitle>
            <AlertDescription>
              Click retry now to try immediately
            </AlertDescription>
          </Alert>
        )}

        {/* Error Details (for debugging) */}
        {process.env.NODE_ENV === 'development' && error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Debug Information</AlertTitle>
            <AlertDescription className="mt-2">
              <code className="text-xs block bg-black/10 p-2 rounded mt-2 overflow-auto">
                {error.stack || error.message}
              </code>
            </AlertDescription>
          </Alert>
        )}

        {/* Suggested Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Suggested Actions:</h4>
          <ul className="space-y-2">
            {getSuggestedActions().map((action, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">{action}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={errorType === 'network' ? 'destructive' : 'secondary'}>
            {errorType === 'network' && <WifiOff className="h-3 w-3 mr-1" />}
            {errorType.charAt(0).toUpperCase() + errorType.slice(1)} Error
          </Badge>
          {retryCount > 0 && (
            <Badge variant={canRetry ? 'default' : 'destructive'}>
              {retryCount} Retries
            </Badge>
          )}
          {isRetrying && (
            <Badge variant="default">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Retrying...
            </Badge>
          )}
        </div>

        {/* Contact Support */}
        {showContactSupport && (
          <Alert className="border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle>Need Help?</AlertTitle>
            <AlertDescription className="space-y-2 mt-2">
              <p>If this problem persists, our support team is here to help:</p>
              <div className="flex flex-col gap-2 mt-2">
                <a 
                  href="mailto:support@reservesurf.com" 
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  support@reservesurf.com
                </a>
                <a 
                  href="tel:+1-555-123-4567" 
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  +1 (555) 123-4567
                </a>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>

      <CardFooter className="flex justify-center gap-3">
        {onGoBack && (
          <Button
            variant="outline"
            onClick={onGoBack}
            disabled={isRetrying}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        )}

        {canRetry && (
          <Button
            onClick={handleRetry}
            disabled={isRetrying}
          >
            {isRetrying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </>
            )}
          </Button>
        )}

        {onGoHome && (
          <Button
            variant="ghost"
            onClick={onGoHome}
            disabled={isRetrying}
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Error Boundary Component
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: (error: Error, reset: () => void) => ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  reset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset)
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <ErrorRecovery
            error={this.state.error}
            errorType="unknown"
            onRetry={this.reset}
            onGoHome={() => window.location.href = '/'}
          />
        </div>
      )
    }

    return this.props.children
  }
}

// Hook for handling async errors
import { useCallback } from 'react'

export function useAsyncError() {
  const [, setError] = useState()
  
  return useCallback(
    (error: Error) => {
      setError(() => {
        throw error
      })
    },
    [setError]
  )
}

// Utility function to determine error type
export function determineErrorType(error: Error | unknown): ErrorType {
  const message = error instanceof Error ? error.message : String(error)
  
  if (message.toLowerCase().includes('network') || 
      message.toLowerCase().includes('fetch') ||
      message.toLowerCase().includes('connection')) {
    return 'network'
  }
  
  if (message.includes('401') || 
      message.includes('403') || 
      message.toLowerCase().includes('unauthorized') ||
      message.toLowerCase().includes('forbidden')) {
    return 'auth'
  }
  
  if (message.includes('422') || 
      message.toLowerCase().includes('validation') ||
      message.toLowerCase().includes('invalid')) {
    return 'validation'
  }
  
  if (message.includes('500') || 
      message.includes('502') || 
      message.includes('503') ||
      message.toLowerCase().includes('server')) {
    return 'server'
  }
  
  if (message.toLowerCase().includes('timeout')) {
    return 'timeout'
  }
  
  return 'unknown'
}