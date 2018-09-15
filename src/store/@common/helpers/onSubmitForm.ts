export const onSubmitForm = <T = {}, M = any>(action: (v: T) => any, propsSelector?: (p: M) => Partial<M>) => (
  values: T,
  dispatch: any,
  props: M
) => dispatch(action(Object.assign({}, values, propsSelector ? propsSelector(props) : {})));
