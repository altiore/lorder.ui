/**
 * @deprecated в пользу уникальной функции. Эта версия кода создает новый экземпляр функции
 * каждый раз, что негативно влияет на производительность
 */
export const onSubmitForm = <FormData = any, P = any>(
  action: (v: FormData, pp?: P) => any,
  propsSelector?: (p: P) => Partial<P>
): any => (values: FormData, dispatch: any, props: P): any =>
  dispatch(action(Object.assign({}, values, propsSelector ? propsSelector(props) : {}), props));
