export function convertToBoolean(value: boolean | 'true' | 'false'): boolean {
  return value === 'false' ? false : !!value;
}

export const noop = {
  onChange: (value: boolean | string) => {},
  onTouched: () => {},
};

export interface EmitToNgModel {
  emitToNgModel(event: any): void;

  updateValue(newValue: any): any;
}
