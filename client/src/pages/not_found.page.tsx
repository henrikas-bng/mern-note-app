import { Container } from 'react-bootstrap';
import AppLayout from './layouts/app.layout';

function NotFoundPage() {
    return (
        <AppLayout>
            <Container>
                <p>404 Page Not Found!</p>
            </Container>
        </AppLayout>
    );
}

export default NotFoundPage;
