import React, { useState } from "react";
import { Row, Col, Button } from "antd";
import {PlayCircleOutlined} from '@ant-design/icons'
import { useParams } from "react-router-dom";
import moment from "moment";
import useFetch from "../../hooks/useFetch";
import { URL_API, API } from "../../utils/constants";
import Loading from "../../components/Loading";
import ReactStars from "react-stars";
import ModalVideo from '../../components/ModalVideo'

import "./Movie.scss";

export default function Movie() {
  const { id } = useParams();
  const movieInfo = useFetch(
    `${URL_API}/movie/${id}?api_key=${API}&language=es-ES`
  );

  if (movieInfo.loading || !movieInfo.result) {
    return <Loading />;
  }

  return <RenderMovie movieInfo={movieInfo.result} />;
}

const RenderMovie = (props) => {
  const {
    movieInfo: { backdrop_path, poster_path },
  } = props;

  const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  return (
    <div
      className="movie"
      style={{ backgroundImage: `url('${backdropPath}')` }}
    >
      <div className="movie__dark" />
      <Row>
        <Col lg={{ span: 8, offset: 3}}  md={{span: 6, offset: 2}} className="movie__poster">
          <PosterMovie image={poster_path} />
        </Col>
        <Col lg={{ span: 10 }} md={{span: 12}} className="movie__info">
          <MovieInfo movieInfo={props.movieInfo} />
        </Col>
      </Row>
    </div>
  );
};

const PosterMovie = (props) => {
  const { image } = props;
  const posterPath = `https://image.tmdb.org/t/p/original${image}`;
  return <div style={{ backgroundImage: `url('${posterPath}')` }} />;
};

const MovieInfo = (props) => {
  const {
    movieInfo: { id, title, release_date, overview, genres, vote_average },
  } = props;

  const [isVisibleModal, setIsVisibleModal ] = useState(false)
  const videoMovie = useFetch(
    `${URL_API}/movie/${id}/videos?api_key=${API}&language=en-US`
  )
  const openModal = () => setIsVisibleModal(true)
  const closeModal = () => setIsVisibleModal(false)

  const renderVideo = () => {
    if(videoMovie.result){
      if(videoMovie.result.results.length > 0){
        return (
          <>
            <Button icon={<PlayCircleOutlined/>} onClick={openModal}>Trailer</Button>
            <ModalVideo
              videoKey={videoMovie.result.results[0].key}
              videoPlatform={videoMovie.result.results[0].site}
              isOpen={isVisibleModal}
              close={closeModal}
            />
          </>
        )
      }
    }
  }

  const voteAverage = (vote_average * 5) / 10;

  return (
    <>
      <div className="movie__info-header">
        <h1>
          {title}{" "}
          <span>{moment(release_date, "YYYY-MM-DD").format("YYYY")}</span>
        </h1>
        {renderVideo()}
      </div>
      <div className="movie__info-content">
        <div className="movie__info-content-stars">
          <ReactStars
            count={5}
            value={Number(voteAverage.toFixed(1))}
            size={24}
            edit={false}
          />
          <span>{voteAverage.toFixed(1)}</span>
        </div>
        <h3>General</h3>
        <p>{overview}</p>
        <h3>Generos</h3>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
