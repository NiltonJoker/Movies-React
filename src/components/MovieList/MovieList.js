import React from "react";
import { List, Avatar, Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import ReactStars from "react-stars";

import "./MovieList.scss";

export default function MovieList(props) {
  const { title, movies } = props;

  if (movies.loading || !movies.result) {
    return <Loading />;
  }

  return (
    <List
      className="movie-list"
      size="default"
      header={<h2>{title}</h2>}
      bordered
      dataSource={movies.result.results}
      renderItem={(movie) => <RenderMovie movie={movie} />}
    />
  );
}

const RenderMovie = (props) => {
  const {
    movie: { id, title, poster_path, vote_average },
  } = props;

  const posterPath = `https://image.tmdb.org/t/p/original${poster_path}`;
  const voteAverage = (vote_average * 5) / 10;
  return (
    <List.Item className="movie-list__movie">
      <List.Item.Meta
        avatar={<Avatar src={posterPath} />}
        title={<Link to={`/movie/${id}`}>{title}</Link>}
        description={
          <div className="movie-list__movie-stars">
            <ReactStars
              count={5}
              value={Number(voteAverage.toFixed(1))}
              size={24}
              edit={false}
            />
            <span>{voteAverage.toFixed(1)}</span>
          </div>
        }
      />
      <Link to={`/movie/${id}`}>
        <Button type="primary" shape="circle" icon={<ArrowRightOutlined />} />
      </Link>
    </List.Item>
  );
};
