import { useMutation, useQuery } from 'react-query';
import { postSampleParams, getSampleParams } from '../store/sample/sampleRequest';
import { getQuery, postQuery } from './base/AxiosQueryService';
import { baseParams } from '../store/baseParams/baseParams';
import { ProfileInfo } from '../store/baseParams/board.store.modules';

export const TestService = () => {
	const postMutation = useMutation({
		mutationFn: (params: postSampleParams) => postQuery('/datainfo/rest/v1.0/users/auth', params),
		onSuccess: (result) => {
			return result.data;
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const getMutation = useMutation({
		mutationFn: (variables: getSampleParams) =>
			getQuery(`/api/getMyHistory?empNo=${variables.empNo}&offset=${variables.offset}&limit=${variables.limit}`),
		onSuccess: (result) => {
			console.log(JSON.stringify(result.data));
			return result.data;
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const getProfileQuery = useQuery<ProfileInfo[]>({
		queryKey: ['getTotalData'],
		queryFn: () => getQuery('/member').then((res) => res.data),
	});

	return { postMutation, getMutation, getProfileQuery };
};

export default TestService;
