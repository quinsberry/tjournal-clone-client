import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { GetServerSideProps } from 'next';
import { ApiService } from '../services/ApiService/ApiService';
import { AppStore } from '../store/AppStore';
import { serializeHydrationProps } from '../lib/next-mobx-hydration';

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
    }).then((response) => {
        const hydrationData = {
            store: 'AppStore data',
            currentUserStore: response,
        };
        return {
            props: {
                ...serializeHydrationProps(hydrationData),
                data: 'other page data',
            },
        };
    }).catch(error => {
        ApiService.handleCaughtErrors(error);
        return { props: {} };
    });
};
