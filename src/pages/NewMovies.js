import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { URL_API, API } from "../utils/constants";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import MovieCatalog from '../components/MovieCatalog'
import Pagination from '../components/Pagination'

export default function NewMovies() {
  const { pag } = useParams();

  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(pag ? pag : 1);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `${URL_API}/movie/now_playing?api_key=${API}&language=es-ES&page=${page}`
      );
      const movies = await response.json();
      setMovieList(movies);
    };

    getMovies();
  }, [page]);

  const onChangePage = page =>{
    setPage(page)
  }

  // Si la página esta fuera de rango
  if (movieList.total_pages) {
    if (page > movieList.total_pages) {
      return (
        <>
          <h1
            style={{
              textAlign: "center",
              marginTop: "25px",
              fontSize: 35,
              fontWeight: "bold",
            }}
          >
            Esta Página no existe
          </h1>
          <div style={{ position: "fixed", bottom: 0, left: 0, width: "100%" }}>
            <Footer />
          </div>
        </>
      );
    }
  }

  return (
    <Row>
      <Col span="24" style={{ textAlign: "center", marginTop: "25px" }}>
        <h1 style={{ fontSize: 35, fontWeight: "bold" }}>
          Últimos Lanzamientos
        </h1>
      </Col>
      {movieList.results ? (
        <Row>
          <Col span="24">
            <MovieCatalog movies={movieList}/>
          </Col>
          <Col span="24">
            <Pagination
              currentPage={movieList.page}
              totalItems={movieList.total_results}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      ) : (
        <Col span="24">
          <Loading/>
        </Col>
      )}
      <Col span="24">
        <Footer />
      </Col>
    </Row>
  );
}
