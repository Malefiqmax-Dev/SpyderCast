export interface SportChannel {
  id: string;
  name: string;
  logo: string;
  source: string;
  type: 'embed' | 'hls';
  category: string;
}

export const SPORT_CHANNELS: SportChannel[] = [
  // beIN SPORTS
  {
    id: 'bein-1',
    name: 'beIN SPORTS 1',
    logo: 'https://imgs.search.brave.com/WI40PUmRhTXDqVlCX3hp2YhMqKX1vWCOL5JPdiWQihU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIxOTU1NjIuanBn',
    source: 'https://lovetier.bz/player/BEINSPORT1FR',
    type: 'embed',
    category: 'beIN SPORTS'
  },
  {
    id: 'bein-2',
    name: 'beIN SPORTS 2',
    logo: 'https://imgs.search.brave.com/WI40PUmRhTXDqVlCX3hp2YhMqKX1vWCOL5JPdiWQihU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIxOTU1NjIuanBn',
    source: 'https://lovetier.bz/player/BEINSPORT2FR',
    type: 'embed',
    category: 'beIN SPORTS'
  },
  {
    id: 'bein-3',
    name: 'beIN SPORTS 3',
    logo: 'https://imgs.search.brave.com/WI40PUmRhTXDqVlCX3hp2YhMqKX1vWCOL5JPdiWQihU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIxOTU1NjIuanBn',
    source: 'https://lovetier.bz/player/BEINSPORT3FR',
    type: 'embed',
    category: 'beIN SPORTS'
  },
  {
    id: 'bein-max-4',
    name: 'beIN SPORTS MAX 4',
    logo: 'https://imgs.search.brave.com/WI40PUmRhTXDqVlCX3hp2YhMqKX1vWCOL5JPdiWQihU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIxOTU1NjIuanBn',
    source: 'https://lovetier.bz/player/BEINMAX4FR',
    type: 'embed',
    category: 'beIN SPORTS MAX'
  },
  {
    id: 'bein-max-5',
    name: 'beIN SPORTS MAX 5',
    logo: 'https://imgs.search.brave.com/WI40PUmRhTXDqVlCX3hp2YhMqKX1vWCOL5JPdiWQihU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIxOTU1NjIuanBn',
    source: 'https://lovetier.bz/player/BEINMAX5FR',
    type: 'embed',
    category: 'beIN SPORTS MAX'
  },
  {
    id: 'bein-max-6',
    name: 'beIN SPORTS MAX 6',
    logo: 'https://imgs.search.brave.com/WI40PUmRhTXDqVlCX3hp2YhMqKX1vWCOL5JPdiWQihU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIxOTU1NjIuanBn',
    source: 'https://lovetier.bz/player/BEINMAX6FR',
    type: 'embed',
    category: 'beIN SPORTS MAX'
  },
  {
    id: 'bein-max-7',
    name: 'beIN SPORTS MAX 7',
    logo: 'https://imgs.search.brave.com/WI40PUmRhTXDqVlCX3hp2YhMqKX1vWCOL5JPdiWQihU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIxOTU1NjIuanBn',
    source: 'https://lovetier.bz/player/BEINMAX7FR',
    type: 'embed',
    category: 'beIN SPORTS MAX'
  },
  {
    id: 'bein-max-8',
    name: 'beIN SPORTS MAX 8',
    logo: 'https://imgs.search.brave.com/WI40PUmRhTXDqVlCX3hp2YhMqKX1vWCOL5JPdiWQihU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIxOTU1NjIuanBn',
    source: 'https://lovetier.bz/player/BEINMAX8FR',
    type: 'embed',
    category: 'beIN SPORTS MAX'
  },
  {
    id: 'bein-max-9',
    name: 'beIN SPORTS MAX 9',
    logo: 'https://imgs.search.brave.com/WI40PUmRhTXDqVlCX3hp2YhMqKX1vWCOL5JPdiWQihU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIxOTU1NjIuanBn',
    source: 'https://lovetier.bz/player/BEINMAX9FR',
    type: 'embed',
    category: 'beIN SPORTS MAX'
  },
  {
    id: 'bein-max-10',
    name: 'beIN SPORTS MAX 10',
    logo: 'https://imgs.search.brave.com/WI40PUmRhTXDqVlCX3hp2YhMqKX1vWCOL5JPdiWQihU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9sb2dv/LzIxOTU1NjIuanBn',
    source: 'https://lovetier.bz/player/BEINMAX10FR',
    type: 'embed',
    category: 'beIN SPORTS MAX'
  },
  // Canal+
  {
    id: 'canal-plus',
    name: 'Canal+',
    logo: 'https://imgs.search.brave.com/6qpAPzCfuRixODhuU0ZOLVPo9PDnI4w2fqbQ8LyGmxw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnB1cmVwZW9w/bGUuY29tL2FydGlj/bGVzLzAvNDYvMjMv/MTAvQC82NjU1NzY1/LWxvZ28tZGUtbGEt/Y2hhaW5lLWNhbmFs/LTU4MHgwLTIucG5n',
    source: 'https://lovetier.bz/player/CANALPLFR',
    type: 'embed',
    category: 'Canal+'
  },
  {
    id: 'canal-sport',
    name: 'Canal+ Sport',
    logo: 'https://imgs.search.brave.com/6jbA9T9fTOWriMFCfuBklNsR_5xxX_RKj57VGIJghAs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQ4LzEvY2FuYWwt/c3BvcnQtbG9nby1w/bmdfc2Vla2xvZ28t/NDgxMjY0LnBuZw',
    source: 'https://lovetier.bz/player/CANALSPORTFR',
    type: 'embed',
    category: 'Canal+'
  },
  {
    id: 'canal-foot',
    name: 'Canal+ Foot',
    logo: 'https://imgs.search.brave.com/VXvmmKTKIzPPrGTMEDuKj5bB_MqMZ3aaBMaOTbWJ8I0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Zm9vdGF6LmZyL2lt/Zy9jaGFpbmVzLzYw/MC9jYW5hbHBsdXNm/b290LmpwZw',
    source: 'https://lovetier.bz/player/FOOTPLUSFR',
    type: 'embed',
    category: 'Canal+'
  },
  // Eurosport
  {
    id: 'eurosport-1',
    name: 'Eurosport 1',
    logo: 'https://imgs.search.brave.com/oftbFEemt8sGB9Cg2svK75UmBc-O4DpWF93Uv-3G_qw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MDUvRXVyb3Nwb3J0/LUxvZ28tNzAweDM5/NC5wbmc',
    source: 'https://lovetier.bz/player/Euro1FR',
    type: 'embed',
    category: 'Eurosport'
  },
  {
    id: 'eurosport-2',
    name: 'Eurosport 2',
    logo: 'https://imgs.search.brave.com/oftbFEemt8sGB9Cg2svK75UmBc-O4DpWF93Uv-3G_qw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MDUvRXVyb3Nwb3J0/LUxvZ28tNzAweDM5/NC5wbmc',
    source: 'https://lovetier.bz/player/Euro2FR',
    type: 'embed',
    category: 'Eurosport'
  },
  // France TV
  {
    id: 'france-2',
    name: 'France 2',
    logo: 'https://imgs.search.brave.com/mON-lMie6FSY_JHgXtejF0RVUjd4rxNlUyxVtnv9Yx0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjMv/MDQvRnJhbmNlLTIt/TG9nby0yMDA4LTUw/MHgyODEucG5n',
    source: 'https://lovetier.bz/player/France2',
    type: 'embed',
    category: 'France TV'
  },
  {
    id: 'france-3',
    name: 'France 3',
    logo: 'https://imgs.search.brave.com/ts-cxcVSUDV74r2kvAHo3O0n9w6JXoMAFouFogIV-qY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzIwLzIvZnJhbmNl/LTMtbG9nby1wbmdf/c2Vla2xvZ28tMjA1/NTkwLnBuZw',
    source: 'https://lovetier.bz/player/France3',
    type: 'embed',
    category: 'France TV'
  },
  // L'Equipe
  {
    id: 'lequipe',
    name: "L'Équipe",
    logo: 'https://imgs.search.brave.com/GZj8HFCXJA-SJH5bRJ5fNPxRU64n44tCTemf0ULoXpY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzgvMi9sZXF1aXBl/LXR2LWxvZ28tcG5n/X3NlZWtsb2dvLTgx/MDkzLnBuZw',
    source: 'https://lovetier.bz/player/EQUIPEFR',
    type: 'embed',
    category: 'Autres'
  },
  // Zonalive
  {
    id: 'ligue1-plus',
    name: 'Ligue 1+',
    logo: 'https://imgs.search.brave.com/DnAH0ucL0tWnrlCys9pTaJkjtnL65nwMT4hPtGRvOf0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcG9y/c29yYS5jb20vd3At/Y29udGVudC91cGxv/YWRzL2Jpcy1pbWFn/ZXMvNDY1MzYvY2E4/ODRkZjM3ZmRkNjQ1/YTE0ZWQ4YTllMTRh/NDQ5ZDctNzU0eDQy/NC5qcGc',
    source: 'https://zonalive.click/player/3/20',
    type: 'embed',
    category: 'Ligue 1+'
  },
  {
    id: 'rmc-sport-1',
    name: 'RMC Sport 1',
    logo: 'https://imgs.search.brave.com/aFIE44SC1m0UsR29WOqaHqMi-aHnrDYRsoU3VP-NX84/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzY0LzIvcm1jLTIw/MjUtbG9nby1wbmdf/c2Vla2xvZ28tNjQ4/ODE0LnBuZw',
    source: 'https://zonalive.click/player/3/17',
    type: 'embed',
    category: 'RMC Sport'
  },
  {
    id: 'tf1',
    name: 'TF1',
    logo: 'https://imgs.search.brave.com/118cOAqS2IIzhfCP693Jp83NYRthNIA3sOpL9S-xvoY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLm96YXAuY29t/L2FydGljbGVzLzIv/NDUvMDAvNTIvQC80/NDU1OTg3LWxlLW5v/dXZlYXUtbG9nby1k/ZS10ZjEtNTgweDAt/MS5qcGc',
    source: 'https://zonalive.click/player/3/24',
    type: 'embed',
    category: 'Autres'
  }
];
