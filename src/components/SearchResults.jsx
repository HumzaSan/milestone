import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function SearchResults({ movieTitle }) {
    const [searchResults, setSearchResults] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (movieTitle) {
            setIsLoading(true);
            fetchSearchResults();
        }
    }, [movieTitle]);

    const fetchSearchResults = async () => {
        try {
            const response = await fetch(`http://localhost:3001/searchMoviesTitle?q=${encodeURIComponent(movieTitle)}&page=${page}`);
            const data = await response.json();
            if (data.results.length === 0) {
                setHasMore(false);
            }
            setSearchResults(prevResults => [...prevResults, ...data.results]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <InfiniteScroll
            dataLength={searchResults.length}
            next={fetchSearchResults}
            hasMore={hasMore}
            loader={isLoading ? <Spinner animation="border" /> : null}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Release Year</th>
                        <th>Rating</th>
                        <th>Special Features</th>
                        <th>Rental Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((result, index) => (
                        <tr key={index}>
                            <td>{result.title}</td>
                            <td>{result.description}</td>
                            <td>{result.release_year}</td>
                            <td>{result.rating}</td>
                            <td>{result.special_features.join(', ')}</td>
                            <td>{result.rental_rate}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </InfiniteScroll>
    );
}
