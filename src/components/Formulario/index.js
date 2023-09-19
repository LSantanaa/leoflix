import { v4 as uuid } from "uuid";
import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useVideoContext } from "contexts/VideosContext";
import { useEffect, useState } from "react";
import { extrairIDDoVideo } from "helpers/extrairId";
import ChildModalCategoria from "./childModalCategoria";

export default function Formulario({ handleCloseModal }) {
  const [titulo, setTitulo] = useState("");
  const [linkRedirect, setLinkRedirect] = useState("");
  const [capa, setCapa] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [linkEmbed, setEmbed] = useState("");
  const [videoEnviado, setVideoEnviado] = useState(false);

  const { addVideo, addCategoria, categorias } = useVideoContext();

  //atraves do id extraido, gera link embed e url da capa do video (youtube apenas)
  function geraEmbedAndCapa(videoId) {
    if (videoId) {
      setCapa(`https://i.ytimg.com/vi/${videoId}/0.jpg`);
      setEmbed(`https://youtube.com/embed/${videoId}`);
    }
  }

  //coleta os dados do video e confirma o envio
  const handleSubmit = (e) => {
    e.preventDefault();
    const video = {
      id: uuid(),
      titulo,
      descricao,
      capa,
      linkRedirect,
      linkEmbed,
      categoria,
      videoDestaque: false,
    };
    if (video.titulo !== "") {
      setVideoEnviado(true);
      addVideo(video);
    }
  };

  //chama função de fechar modal ao concluir o envio do video
  useEffect(() => {
    if (videoEnviado) {
      const timer = setTimeout(() => {
        handleCloseModal();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [videoEnviado, handleCloseModal]);

  return (
    <>
      {!videoEnviado ? (
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            align="center"
            color="var(--white)"
            component="p"
            fontFamily="var(--font-titulo)"
            fontWeight={600}
          >
            Novo Vídeo
          </Typography>
          <TextField
            required
            label="Título"
            name="titulo"
            id="titulo"
            variant="outlined"
            margin="normal"
            fullWidth
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <TextField
            required
            type="url"
            placeholder="ex: https://www.youtube.com/watch?v=id"
            label="Link do Vídeo (Youtube)"
            name="linkRedirect"
            id="linkRedirect"
            variant="outlined"
            margin="normal"
            fullWidth
            value={linkRedirect}
            onChange={(e) => setLinkRedirect(e.target.value)}
            onBlur={(e) => geraEmbedAndCapa(extrairIDDoVideo(e.target.value))}
          />
          <TextField
            type="url"
            placeholder="https://exemplo.com"
            label="Link da Imagem do vídeo"
            name="capa"
            id="capa"
            variant="outlined"
            fullWidth
            margin="normal"
            value={capa}
            onChange={(e) => setCapa(e.target.value)}
          />
          <FormControl margin="normal" fullWidth required>
            <InputLabel id="categoria">Categoria</InputLabel>
            <Select
              labelId="categoria"
              id="categoria"
              label="Categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((categoria) => (
                <MenuItem
                  key={uuid()}
                  value={categoria.nome}
                  sx={{ textTransform: "capitalize" }}
                >
                  {categoria.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ChildModalCategoria
            addCategoria={addCategoria}
          />
          <TextField
            required
            label="Descrição"
            name="descricao"
            id="descricao"
            variant="outlined"
            margin="normal"
            placeholder="Forneça uma breve descrição sobre o vídeo"
            multiline
            rows={3}
            fullWidth
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{
              backgroundColor: "var(--blue-800)",
              color: "var(--white)",
              marginTop: "1rem",
            }}
            size="large"
            fullWidth
          >
            Enviar
          </Button>
        </form>
      ) : (
        <Grow in={videoEnviado}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CheckCircleOutlineOutlined sx={{ fontSize: 64, color: "green" }} />
            <Typography variant="h6" color="textSecondary">
              Vídeo Enviado com Sucesso!!!
            </Typography>
          </Box>
        </Grow>
      )}
    </>
  );
}
