# Fin2Gether · Identidade visual (MVP)

Referência das cores, da tipografia e da logo usadas nos protótipos do app.

---

## 1. Cores

### Base

| Token | Hex | Uso |
|---|---|---|
| `bg` | `#F3F6F1` | Fundo das telas |
| `surface` | `#FFFFFF` | Cards, inputs, barra de navegação |
| `surface-alt` | `#F9FBF8` | Inputs dentro de cards |
| `text` | `#13261C` | Texto principal, botão "Continuar com Apple" |
| `text-muted` | `#5B6B61` | Texto secundário, legendas, ícones inativos |
| `text-control` | `#3F4F45` | Texto de opções não selecionadas |

### Marca

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#1E6B47` | Botões principais, ícone ativo, barras de progresso, links |
| `primary-dark` | `#0F3B28` | Cards de destaque (resumo do mês, cartão, espaço do casal) |
| `accent` | `#B9E07A` | Destaques sobre o verde escuro, barra do mês, avatar secundário |
| `primary-soft` | `#D7EEDD` | Chips, botões secundários, avatares, status "Pago" |
| `primary-softer` | `#EEF7F0` | Fundo de opção selecionada |
| `accent-soft` | `#E9F5CF` | Avatar do parceiro(a) no histórico |

### Linhas e controles

| Token | Hex | Uso |
|---|---|---|
| `border` | `#E2E8E1` | Bordas de cards e divisores |
| `border-input` | `#D5DED3` | Bordas de inputs e botões secundários |
| `track` | `#EAF0E8` | Trilho das barras de progresso |
| `segmented-bg` | `#E4EBE2` | Fundo dos seletores segmentados |
| `radio-off` | `#B8C4B9` | Rádio não selecionado |
| `border-dashed` | `#9FB3A3` | Botão tracejado "Adicionar" |

### Status e alertas

| Token | Hex | Uso |
|---|---|---|
| `warning` | `#C2410C` | Ponto de notificação, barra acima do limite |
| `warning-bg` | `#FDECD8` | Fundo de alerta e status "Pendente" / "Atrasado" |
| `warning-text` | `#9A3412` | Texto sobre `warning-bg` |
| `warning-strong` | `#7C2D12` | Título do banner de alerta |
| `danger-bg` | `#FBD5D0` | Fundo da faixa "Crítico" (90%) |
| `danger-text` | `#991B1B` | Texto sobre `danger-bg` |

### Transparências (sobre `primary-dark`)

| Uso | Valor |
|---|---|
| Texto secundário | `rgba(255,255,255,0.8)` |
| Mini cards internos | `rgba(255,255,255,0.08)` |
| Trilho da barra | `rgba(255,255,255,0.14)` |
| Borda de botão | `rgba(255,255,255,0.3)` |
| Fundo do selo "57% da renda" | `rgba(185,224,122,0.16)` |
| Sombra do botão "+" | `0 6px 16px rgba(15,59,40,0.3)` |

### Contraste

Todas as combinações de texto usadas passam o mínimo de 4,5:1 (WCAG AA). Os pontos de atenção:
- `text-muted` (`#5B6B61`) só deve ser usado sobre `#FFFFFF` ou `#F3F6F1`, nunca sobre tons mais escuros.
- Sobre `primary-dark`, use apenas branco, `accent` ou `rgba(255,255,255,0.8)`.

---

## 2. Tipografia

**Fonte:** [Manrope](https://fonts.google.com/specimen/Manrope), Google Fonts, licença livre (SIL Open Font License).

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Fallback: `Manrope, system-ui, sans-serif`. No React Native/Expo, use o pacote `@expo-google-fonts/manrope`.

**Pesos:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold).

### Escala

| Estilo | Tamanho | Peso | Uso |
|---|---|---|---|
| Valor destaque | 44px | 800 | Valor no cadastro de gasto |
| Número hero | 36px | 800 | Gasto do mês |
| Número grande | 30px / 28px | 800 | Fatura, total guardado, aporte calculado |
| Título de onboarding | 26–28px | 800 | Títulos dos passos do cadastro |
| Título de tela | 24px | 800 | "Cartões", "Gastos fixos" |
| Título de header | 18–20px | 800 | Telas internas com botão voltar |
| Botão principal | 16px | 800 | CTAs |
| Corpo / input | 15px | 400–700 | Inputs, títulos de seção |
| Item de lista | 14px | 700 | Nome de gasto, cartão, objetivo |
| Label | 13px | 600–700 | Labels de campo, legendas |
| Meta | 12px | 500–700 | Informação secundária, selos |
| Mini | 11px | 600–800 | Barra de navegação, chips de status |

### Regras

- Valores em dinheiro usam `font-variant-numeric: tabular-nums` para os números ficarem alinhados.
- Números de 28px ou mais usam `letter-spacing: -0.02em`.
- Rótulos em caixa alta (ex.: "PARCEIRO(A)") usam 12px, peso 800, `letter-spacing: 0.04em`, cor `primary`.

---

## 3. Logo

Dois círculos sobrepostos, um verde (`primary`) e um lima (`accent`, 85% de opacidade), representando duas pessoas e a área compartilhada entre elas. Ao lado, o nome em Manrope 800.

**Status:** conceito provisório feito para o protótipo, não uma marca final. Antes de registrar, vale um trabalho de design dedicado e a verificação de disponibilidade do nome no INPI e nas lojas.

### Ícone

```svg
<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
  <circle cx="14" cy="18" r="10" fill="#1E6B47"/>
  <circle cx="22" cy="18" r="10" fill="#B9E07A" fill-opacity="0.85"/>
</svg>
```

### Logo completa

```svg
<svg width="180" height="36" viewBox="0 0 180 36" xmlns="http://www.w3.org/2000/svg">
  <circle cx="14" cy="18" r="10" fill="#1E6B47"/>
  <circle cx="22" cy="18" r="10" fill="#B9E07A" fill-opacity="0.85"/>
  <text x="42" y="25" font-family="Manrope, system-ui, sans-serif" font-size="20" font-weight="800" letter-spacing="-0.2" fill="#13261C">Fin2Gether</text>
</svg>
```

Os arquivos `logo-icone.svg` e `logo-completa.svg` acompanham este documento. A versão completa depende da fonte Manrope instalada para exibir o texto corretamente. Para uso final, converta o texto em contorno num editor vetorial (Figma, Illustrator, Inkscape).
