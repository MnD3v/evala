import { generateMetadata as getMetadata } from './metadata';

export const generateMetadata = getMetadata;

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 