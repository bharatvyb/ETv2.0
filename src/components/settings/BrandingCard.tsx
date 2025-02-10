import React from 'react';
import { Building2, Code2 } from 'lucide-react';
import { Card } from '../common';

export function BrandingCard() {
  return (
    <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-gray-600" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">BharatVyb AI Solutions</h3>
            <p className="text-sm text-gray-600">Version 2.0.0</p>
          </div>
        </div>
        <Code2 className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} BharatVyb AI Solutions. All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Made with ❤️ in India
        </p>
      </div>
    </Card>
  );
}