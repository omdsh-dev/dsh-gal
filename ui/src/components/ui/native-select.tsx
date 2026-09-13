import * as React from 'react';
import { cn } from '@/lib/utils';
// Native-select variant: keyboard and platform picker behavior remain native.
export const NativeSelect=React.forwardRef<HTMLSelectElement,React.ComponentProps<'select'>>(({className,...props},ref)=><select ref={ref} data-slot="native-select" className={cn('flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50',className)} {...props}/>);
NativeSelect.displayName='NativeSelect';
