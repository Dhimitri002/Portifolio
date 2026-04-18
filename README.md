# Portfólio Haru

Portfólio estático de Dhimitri "Haru" Carvalho, criado para ser uma experiência digital viva, autoral e pronta para GitHub Pages.

## Estrutura do projeto

- `index.html` — página principal.
- `css/` — estilos principais, temas, animações e responsividade.
- `js/` — lógica do site, dados, autenticação, configurações e UI.
- `data/` — conteúdo em JSON para perfil, projetos, habilidades, contatos, timeline, serviços e estatísticas.
- `images/` — imagens de suporte e capas de projeto.
- `.nojekyll` — evita processamento Jekyll no GitHub Pages.

## Como usar

### Abrir localmente
1. Abra `index.html` diretamente no navegador, ou
2. Use um servidor local como:
   ```bash
   python3 -m http.server 8000
   ```
3. Acesse `http://localhost:8000`

### Editar conteúdo
- `data/profile.json` — dados pessoais e informações de introdução.
- `data/projects.json` — projetos, tags, links e status.
- `data/skills.json` — habilidades e proficiências.
- `data/socials.json` — contatos e links.
- `data/timeline.json` — marcos de evolução.
- `data/services.json` — serviços oferecidos.
- `data/stats.json` — métricas e indicadores.
- `data/settings.json` — presets e preferências de tema.

### Editar cores e temas
- Estilos base em `css/main.css`
- Temas em `css/themes.css`
- Animações em `css/animations.css`
- Responsividade em `css/responsive.css`

### Painel admin e login local
- Clique em `Login` no topo.
- Usuário: `haru`
- Senha: `anime2026`
- Após entrar, o painel admin permite editar conteúdo e exportar/importar configurações.
- O login é local e preservado no navegador via `localStorage`.

### Exportar/importar configurações
- Abra o painel de configurações e use o botão `Exportar JSON`.
- Para importar, selecione um arquivo JSON válido criado pelo site.
- Use `Restaurar padrão` para reverter o tema para o estado inicial.

## Deploy no GitHub Pages
1. Commit e envie para a branch `main`.
2. No repositório GitHub, ative o GitHub Pages apontando para a branch `main` / pasta raiz.
3. O arquivo `.nojekyll` já está presente para evitar transformações de arquivos.

## Observações técnicas
- Este projeto usa JavaScript puro para manter leveza e compatibilidade com páginas estáticas.
- Os conteúdos são carregados dinamicamente a partir de arquivos JSON locais.
- O sistema de login e o painel admin são implementados apenas como camada front-end.
- O site segue uma estética escura, com cores vermelho vinho, ciano e efeitos futuristas.

## Como contribuir
- Adicionar novos projetos em `data/projects.json`.
- Atualizar imagens em `images/` e ajustar as referências nos JSONs.
- Refinar o visual em `css/main.css` e `css/themes.css`.
- Expandir o painel admin com edição direta de JSON.
