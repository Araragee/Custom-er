export const useCodeGenerator = () => {
  const generateCode = (componentName: string, props: Record<string, any>) => {
    // Basic formatting for props
    const propsString = Object.entries(props)
      .filter(([key, value]) => {
        // Exclude default values if possible, or just print all
        // For simplicity, print truthy values or non-default
        if (value === false || value === undefined || value === null) return false;
        // Don't exclude 0 for opacity if it's relevant, but opacity 100 might be default?
        // Let's print everything for now to be explicit, except falsy booleans.
        return true;
      })
      .map(([key, value]) => {
        if (typeof value === 'boolean') {
          return value ? key : '';
        }
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        if (typeof value === 'number') {
           return `:${key}="${value}"`;
        }
        return `:${key}="${value}"`; // Fallback
      })
      .filter(Boolean)
      .join(' ');

    return `<${componentName} ${propsString}>\n  Click Me\n</${componentName}>`;
  };

  return { generateCode };
};
