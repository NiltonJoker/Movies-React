import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import {EyeOutlined} from '@ant-design/icons';
import "./MovieCatalog.scss";
import ImageAvaible from '../../assets/img/noavaible.png'

export default function MovieCatalog(props) {
  const {
    movies: { results },
  } = props;

  return (
    <Row>
      {results.map((movie) => (
        <Col key={movie.id} xs={24} sm={12} md={8} lg={4} className="movie-catalog">
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}

const MovieCard = (props) => {
  const {movie: {id, title, poster_path}} = props
  const {Meta} = Card
  const posterPath = `https://image.tmdb.org/t/p/original/${poster_path}`
  return(
    <Link to={`/movie/${id}`}>
      <Card
        hoverable
        style={{width: 240}}
        cover={<img alt={title} src={poster_path ? posterPath : ImageAvaible}/>}
        actions={[<EyeOutlined />]}
        
      >
        <Meta title={title} />
      </Card>
    </Link>
  )
};
