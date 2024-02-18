import { Container } from 'react-bootstrap';
import AppLayout from './layouts/app.layout';

function HomePage() {
    return (
        <AppLayout>
            <Container>
                <p>Hello World!</p>
            </Container>
        </AppLayout>
    );
}

export default HomePage;
