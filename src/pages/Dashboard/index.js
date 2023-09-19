import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  Grow,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./Dashboard.module.css";
import { CheckCircleOutlineOutlined, Delete, FavoriteBorder, FavoriteOutlined } from "@mui/icons-material";
import { useVideoContext } from "contexts/VideosContext";
import { useEffect, useState } from "react";

function ColorPicker({ categoria, onChange }) {
  const [localColor, setLocalColor] = useState(categoria.cor);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setLocalColor(newColor);
  };

  const handleColorBlur = () => {
    onChange(localColor);
  };

  return (
    <TextField
      size="small"
      type="color"
      label="Cor"
      fullWidth
      value={localColor}
      onChange={handleColorChange}
      onBlur={handleColorBlur}
    />
  );
}

export default function Dashboard() {
  const {
    videos,
    categorias,
    mudarCorCategoria,
    mudarFavorito,
    mudarVideoFavorito,
    excluirCategoria,
  } = useVideoContext();

  const [openModalDel, setOpenModalDel] = useState(false);
  const [idCategoriaDelete, setIdCategoriaDelete] = useState(null);
  const [confirmadoExclusao, setConfirmadoExclusao] = useState(false);

  const initialVideoDestaquePorCategoria = categorias.reduce(
    (acc, categoria) => {
      const videosPorCategoria = videos.filter(
        (video) => video.categoria === categoria.nome
      );
      const videoDestaque = videosPorCategoria.find(
        (video) => video.videoDestaque
      );

      if (videoDestaque) {
        acc[categoria.id] = videoDestaque.id;
      }
      return acc;
    },
    {}
  );

  const [videoDestaquePorCategoria, setVideoDestaquePorCategoria] = useState(
    initialVideoDestaquePorCategoria
  );

  const handleVideoDestaqueChange = (categoriaId, videoId, categoriaNome) => {
    setVideoDestaquePorCategoria((prevState) => ({
      ...prevState,
      [categoriaId]: videoId,
    }));
    mudarVideoFavorito(videoId, categoriaNome);
  };

  const excluir = (cat) => {
    setConfirmadoExclusao(true);
    excluirCategoria(cat);
  };

  const handleClose = () => {
    setOpenModalDel(false);
    setConfirmadoExclusao(false);
  };

  useEffect(() => {
    if (confirmadoExclusao) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [confirmadoExclusao]);

  return (
    <section className={styles.tableArea}>
      <table>
        <thead>
          <tr>
            <th>Categorias</th>
            <th>Cor</th>
            <th>Quantidade de videos</th>
            <th>Video Destaque</th>
            <th>Banner?</th>
            <th>Excluir?</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => {
            const videosPorCategoria = videos.filter(
              (video) => video.categoria === categoria.nome
            );
            const disabled = videosPorCategoria.length <= 0 ? true : false;

            const contemVideo =
              videos.filter((video) => video.categoria === categoria.nome)
                .length > 0
                ? true
                : false;

            return (
              <tr key={categoria.id}>
                {contemVideo && (
                  <>
                    <td>{categoria.nome}</td>
                    <td className={styles.tdCor}>
                      <ColorPicker
                        categoria={categoria}
                        onChange={(newColor) =>
                          mudarCorCategoria(newColor, categoria.id)
                        }
                      />
                    </td>
                    <td>{videosPorCategoria.length}</td>
                    <td className={styles.tdVideoDestaque}>
                      <FormControl
                        disabled={disabled}
                        margin="normal"
                        size="small"
                        sx={{ maxWidth: 250, color: "var(--white)" }}
                      >
                        <InputLabel id={`video-${categoria.id}`}>
                          Selecione o Vídeo
                        </InputLabel>
                        <Select
                          labelId={`video-${categoria.id}`}
                          id={`video-${categoria.id}`}
                          label="Selecione o Vídeo"
                          value={videoDestaquePorCategoria[categoria.id] || ""}
                          onChange={(e) =>
                            handleVideoDestaqueChange(
                              categoria.id,
                              e.target.value,
                              categoria.nome
                            )
                          }
                        >
                          {videosPorCategoria.map((video) => (
                            <MenuItem key={video.id} value={video.id}>
                              {video.titulo}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </td>
                    <td>
                      <IconButton
                        disabled={disabled}
                        variant="solid"
                        onClick={() => {
                          mudarFavorito(categoria.id);
                        }}
                      >
                        {categoria.destaque ? (
                          <FavoriteOutlined sx={{ color: "var(--white)" }} />
                        ) : (
                          <FavoriteBorder sx={{ color: "var(--white)" }} />
                        )}
                      </IconButton>
                    </td>
                    <td>
                      <IconButton
                        onClick={() => {
                          setOpenModalDel(true);
                          setIdCategoriaDelete({
                            id: categoria.id,
                            nome: categoria.nome,
                          });
                        }}
                      >
                        <Delete />
                      </IconButton>
                      <Modal
                        open={openModalDel}
                        onClose={handleClose}
                        aria-labelledby="modal para confirmar exclusão de categorias e videos"
                        aria-describedby="Confirme ou Cancele a exclusão da categoria e dos videos da categoria"
                      >
                        <Box className={styles.boxModalDel}>
                          {!confirmadoExclusao ?(
                          <>
                          <Alert
                            severity="warning"
                            variant="outlined"
                            sx={{
                              mb: 2,
                              fontFamily: "var(--font-padrao)",
                              fontSize: "1.1rem",
                            }}
                          >
                            <AlertTitle>Atenção!</AlertTitle>
                            Excluir a categoria também excluíra todos os vídeos
                            dessa categoria.
                          </Alert>
                          <Typography
                            fontFamily={"var(--font-padrao)"}
                            textAlign={"center"}
                            fontSize={"1.2rem"}
                          >
                            Você deseja confirmar a exclusão?
                          </Typography>
                          <div className={styles.flex}>
                            <Button
                              onClick={() => excluir(idCategoriaDelete)}
                              type="button"
                              variant="outlined"
                              fullWidth
                              sx={{
                                backgroundColor: "var(--red-600)",
                                ":hover": {
                                  backgroundColor: "var(--red-800)",
                                  borderColor: "var(--red-700)",
                                },
                                color: "var(--white)",
                              }}
                            >
                              Confirma
                            </Button>
                            <Button
                              onClick={handleClose}
                              variant="outlined"
                              fullWidth
                            >
                              Cancelar
                            </Button>
                          </div>
                          </>
                          ):(
                          <Grow in={confirmadoExclusao}>
                            <Box
                              display="flex"
                              flexDirection="column"
                              alignItems="center"
                            >
                              <CheckCircleOutlineOutlined
                                sx={{ fontSize: 64, color: "green" }}
                              />
                              <Typography variant="h6" color="textSecondary">
                                Excluído com sucesso
                              </Typography>
                            </Box>
                          </Grow>
                          )}
                        </Box>
                      </Modal>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
