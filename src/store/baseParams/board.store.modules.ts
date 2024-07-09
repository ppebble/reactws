import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ActionItem = {
	setPostList: (item: PostInfo[]) => void | null;
	setProfileList: (item: ProfileInfo[]) => void | null;
};
export type PostInfo = {
	id: number;
	title: string;
	author: string;
	date: number | string | Date;
	content?: string;
};

interface BoardListStore {
	postList: PostInfo[];
	profileList: ProfileInfo[];
	action: ActionItem;
}

const useBoardListStore = create<BoardListStore>()(
	devtools(
		(set, get) => ({
			postList: [],
			profileList: [],
			action: {
				// 조회한 게시글 리스트 저장
				setPostList: (item: PostInfo[]) =>
					set(
						{
							postList: item,
						},
						false,
						'POST_LIST',
					),
				setProfileList: (item: ProfileInfo[]) =>
					set(
						{
							profileList: item,
						},
						false,
						'PROFILE_LIST',
					),
			},
		}),
		{
			name: 'auth-store', // 저장소 key값
			version: 1.0, // version 정보
		},
	),
);
export interface ProfileInfo {
	empNo: string;
	userId: string;
	userName: string;
	residentNumber: string;
	gender: string;
	engName: string;
	family: string;
	armyStart: string;
	armyEnd: string;
	armyBranch: string;
	birthday: string;
	address: string;
	highschool: string;
	gradSchool: string;
	education: string;
	loc: string;
	emailAuth: string;
	tel: string;
	position: string;
	spot: string;
	task: string;
	techGrade: string;
	scienceTechCertify: string;
	locDetail: string;
	hiredate: string;
	leavedate: string;
	emergencyTel: string;
	relation: string;
	multiMajor1: string;
	multiMajor2: string;
}

export const usePostList = () => useBoardListStore((state) => state.postList);
export const useProfile = () => useBoardListStore((state) => state.profileList);
export const useBoardListAction = () => useBoardListStore((state) => state.action);
// export default useLoginStore;
