// import { AxiosResponse } from 'axios';
// import get from 'lodash-es/get';
// import { Action, ActionMeta, handleActions } from 'redux-actions';
// import { Member } from './Member';
// import { DownloadList } from '../../@common/entities';
//
// type S = DownloadList<Member>;
// type P = AxiosResponse | IM;
// type M = IMeta<{ projectId: number; email: string; memberId: number }>;
//
// const postProjectMemberHandler = (state: S, { payload }: Action<P>) => {
//   const projectIndex = state.list.findIndex(el => get(payload, 'projectId') === el.id);
//   return DownloadList.updateItem<Project>(Project, state, projectIndex, {
//     members: [
//       ...state.list[projectIndex].members,
//       new Member({
//         accessLevel: 1,
//         member: { email: (payload as IM).email },
//         status: 0,
//       }),
//     ],
//   });
// };
//
// const postProjectMemberSuccessHandler = (state: S, { payload, meta }: ActionMeta<P, M>) => {
//   const memberIndex = state.list[projectIndex].members.findIndex(
//     el => meta.previousAction.payload.email === el.member.email
//   );
//   return DownloadList.updateItem<Member>(Member, state, memberIndex, payload.data);
// };
//
// const postProjectMemberFailHandler = (state: S, { meta }: ActionMeta<P, M>) => {
//   const projectIndex = state.list.findIndex(el => meta.previousAction.payload.projectId === el.id);
//   return DownloadList.updateItem<Project>(Project, state, projectIndex, {
//     members: state.list[projectIndex].members.slice(0, state.list[projectIndex].members.length - 1),
//   });
// };
//
// const deleteProjectMemberHandler = (state: S, { payload }: Action<P>) => {
//   const projectIndex = state.list.findIndex(el => (payload as IM).projectId === el.id);
//   const memberIndex = state.list[projectIndex].members.findIndex(el => (payload as IM).memberId === el.member.id);
//   return DownloadList.updateItem<Project>(Project, state, projectIndex, {
//     members: [
//       ...state.list[projectIndex].members.slice(0, memberIndex),
//       ...state.list[projectIndex].members.slice(memberIndex + 1),
//     ],
//   });
// };
//
// // TODO: add member to delete request in order to have ability revert it back if request failed
// // const deleteProjectMemberFailHandler = (state: S, { payload, meta }: ActionMeta<P, M>) => {
// //   const projectIndex = state.list.findIndex(el => meta.previousAction.payload.projectId === el.id);
// //   const memberIndex = state.list[projectIndex].members.findIndex(el => meta.previousAction.payload.email === el.email);
// //   return new DownloadList({
// //     ...state,
// //     list: [
// //       ...state.list.slice(0, projectIndex),
// //       new Project({
// //         ...state.list[projectIndex],
// //         members: [
// //           ...state.list[projectIndex].members.slice(0, memberIndex),
// //           new User((payload as AxiosResponse).data),
// //           ...state.list[projectIndex].members.slice(memberIndex + 1),
// //         ],
// //       }),
// //       ...state.list.slice(projectIndex + 1),
// //     ],
// //   });
// // };
//
// export const projects = handleActions<S, P>(
//   {
//     [postProjectMember.toString()]: postProjectMemberHandler,
//     [postProjectMember.success]: postProjectMemberSuccessHandler,
//     [postProjectMember.fail]: postProjectMemberFailHandler,
//     [deleteProjectMember.toString()]: deleteProjectMemberHandler,
//     // [deleteProjectMember.fail]: deleteProjectMemberFailHandler,
//   },
//   new DownloadList()
// );
