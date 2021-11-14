import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { GetServerSideProps } from 'next';
import { ApiService } from '../services/ApiService/ApiService';
import { AppHydration } from '../store/AppStoreHydration';

export default function Home() {
    return (
        <MainLayout>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </MainLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    return ApiService.context(ctx).requests.user.fetchCurrentUser({
        prediction: () => true,
        data: {},
    }).then((user) => {
        const hydration = AppHydration.serializeHydrationProps({
            store: 'AppStore data',
            currentUserStore: {
                userInfo: user,
            },
        });
        return {
            props: {
                ...hydration,
                data: 'other page data',
            },
        };
    }).catch(error => {
        ApiService.handleCaughtErrors(error);
        return { props: {} };
    });
};
