import Banner from "components/Banner";
import CategoriaCarousel from "components/CategoriasCarousel";
import { useVideoContext } from "contexts/VideosContext";

function Home() {
  const { videos, categorias } = useVideoContext();

  const categoriaDestaque = categorias.find((categoria) => categoria.destaque);

  const videosCategoriaDestaque = videos.filter(
    (video) => video.categoria === categoriaDestaque.nome
  );
  const videoDestaque = videosCategoriaDestaque.find(
    (video) => video.videoDestaque
  );

  return (
    <>
      <main>
        <Banner
          categoriaDestaque={categoriaDestaque}
          outrosVideosDaCategoria={videosCategoriaDestaque.filter(
            (video) => video !== videoDestaque
          )}
          videoDestaque={videoDestaque}
        />
      </main>
      <CategoriaCarousel
        videos={videos.filter(
          (video) => video.categoria !== categoriaDestaque.nome
        )}
        categorias={categorias.filter(
          (categoria) => categoria.nome !== categoriaDestaque.nome
        )}
      ></CategoriaCarousel>
    </>
  );
}

export default Home;
