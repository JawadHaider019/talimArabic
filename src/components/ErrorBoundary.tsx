import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'An unexpected rendering error occurred.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-2xl border border-[#E5E9F0] p-6 text-center shadow-sm">
            <h1 className="text-lg font-bold text-[#0B192C]">
              Something went wrong
            </h1>
            <p className="text-sm text-[#64748B] mt-2">{this.state.message}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B192C] text-white text-sm font-semibold hover:bg-[#152A47] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload dashboard</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
