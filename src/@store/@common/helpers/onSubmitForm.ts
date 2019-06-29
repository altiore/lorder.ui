export const onSubmitForm = <FormData = any, P = any>(
  action: (v: FormData) => any,
  propsSelector?: (p: P) => Partial<P>
): any => (values: FormData, dispatch: any, props: P): any =>
  dispatch(action(Object.assign({}, values, propsSelector ? propsSelector(props) : {})));
