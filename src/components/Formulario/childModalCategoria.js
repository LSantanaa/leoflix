import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import styles from "./ChildForm.module.css";
import { Box, Button, Grow, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function ChildModalCategoria({ addCategoria }) {
  const [cor, setCor] = useState("#ffffff");
  const [nome, setNome] = useState("");
  const [open, setOpen] = useState(false);
  const [categoriaEnviada, setCategoriaEnviada] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setCategoriaEnviada(false);
    setNome('');
  };

  const enviaCategoria = () => {
    if (nome !== "") {
      const newCategoria = { id: uuid(), nome, cor, destaque: false };
      addCategoria(newCategoria);
      setCategoriaEnviada(true);
    }
  };

  useEffect(() => {
    if (categoriaEnviada) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [categoriaEnviada]);

  return (
    <>
      <Typography variant="body2" component="p">
        Não encontrou a categoria que precisava?
      </Typography>
      <Button
        size="small"
        sx={{
          color: "var(--blue-700)",
          fontFamily: "var(--font-padrao)",
          fontWeight: 600,
          padding: 0,
          ":hover": { background: "none" },
        }}
        onClick={handleOpen}
      >
        Clique aqui para uma nova categoria.
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="formulário de adição de categoria"
        aria-describedby="adicione uma nova categoria ao LeoFlix"
      >
        <Box className={styles.boxChildModal}>
          <Typography
            variant="h5"
            align="center"
            color="var(--white)"
            component="p"
            fontFamily="var(--font-titulo)"
            fontWeight={600}
          >
            Nova categoria
          </Typography>
          {!categoriaEnviada ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                value={nome}
                label="Nome da Categoria"
                id="nome"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e) => setNome(e.target.value)}
              />
              <TextField
                type="color"
                value={cor}
                label="Selecione a Cor"
                id="cor"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={(e) => setCor(e.target.value)}
              />
              <div className={styles.flex}>
                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  sx={{
                    backgroundColor: "var(--blue-800)",
                    color: "var(--white)",
                  }}
                  onClick={enviaCategoria}
                >
                  Adicionar
                </Button>
                <Button
                  type="reset"
                  onClick={handleClose}
                  variant="outlined"
                  size="large"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          ) : (
            <Grow in={categoriaEnviada}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <CheckCircleOutlineOutlined
                  sx={{ fontSize: 64, color: "green" }}
                />
                <Typography variant="h6" color="textSecondary">
                  Nova Categoria Adicionada
                </Typography>
              </Box>
            </Grow>
          )}
        </Box>
      </Modal>
    </>
  );
}
