/**
 * Error Boundary para captura de erros em componentes React
 * Previne que erros quebrem toda a aplicação
 */

'use client';

import type { ReactNode } from 'react';
import React from 'react';

// ==================== TIPOS ====================

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showDetails?: boolean;
}

// ==================== ERROR BOUNDARY COMPONENT ====================

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Chamar callback personalizado se fornecido
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    this.setState({
      hasError: true,
      error,
      errorInfo,
    });

    // Em produção, enviar erro para serviço de monitoramento
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implementar envio para Sentry, LogRocket, etc.
      this.reportError(error, errorInfo);
    }
  }

  private reportError(error: Error, errorInfo: React.ErrorInfo): void {
    // Implementar relatório de erro para serviços externos
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Exemplo: enviar para API de logging
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorReport),
    }).catch(() => {
      // Falha silenciosa para não quebrar ainda mais
    });
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  override render(): ReactNode {
    if (this.state.hasError) {
      // Render fallback customizado se fornecido
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Render padrão de erro
      return (
        <div className='flex min-h-[400px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50'>
          <div className='max-w-md p-8 text-center'>
            <div className='mb-6'>
              <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
                <svg
                  className='h-8 w-8 text-red-500'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 15.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
            </div>

            <h2 className='mb-2 text-xl font-semibold text-gray-900'>
              Oops! Algo deu errado
            </h2>

            <p className='mb-6 text-gray-600'>
              Ocorreu um erro inesperado. Tente recarregar a página ou entre em
              contato conosco se o problema persistir.
            </p>

            <div className='space-y-3'>
              <button
                onClick={this.handleRetry}
                className='w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
              >
                Tentar Novamente
              </button>

              <button
                onClick={() => window.location.reload()}
                className='w-full rounded-md bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700'
              >
                Recarregar Página
              </button>
            </div>

            {/* Mostrar detalhes do erro em desenvolvimento */}
            {this.props.showDetails &&
              process.env.NODE_ENV === 'development' && (
                <details className='mt-6 text-left'>
                  <summary className='cursor-pointer text-sm text-gray-500'>
                    Detalhes do erro (desenvolvimento)
                  </summary>
                  <div className='mt-2 overflow-auto rounded bg-gray-100 p-3 text-xs text-gray-700'>
                    <div className='mb-2'>
                      <strong>Error:</strong> {this.state.error?.message}
                    </div>
                    <div className='mb-2'>
                      <strong>Stack:</strong>
                      <pre className='mt-1 whitespace-pre-wrap'>
                        {this.state.error?.stack}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className='mt-1 whitespace-pre-wrap'>
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// ==================== HOOK PARA ERROR BOUNDARY ====================

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
}
