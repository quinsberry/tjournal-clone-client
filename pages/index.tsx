import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { GetServerSideProps } from 'next';
import { serializeHydrationProps } from '../store/hydration';

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
    const hydrationData = { data: 'data only for hydration' };
    return {
        props: serializeHydrationProps(hydrationData, { data: 'other page data' }),
    };
};
