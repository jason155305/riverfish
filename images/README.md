# 川魚堂官網圖片素材替換指南 (Image Replacement Guide)

本資料夾已預先為您建立好 7 個精美的 SVG 向量設計圖。這些圖會作為官網的預設背景與吉祥物展示圖。

當您準備好將自己的照片（從 Google 相簿下載的照片）放上網站時，請參考以下步驟與對照表：

## 替換步驟

1. **下載相片**：點選您提供的 Google 相簿連結，下載您最喜歡的幾張照片：
   * 吉祥物布偶貓相簿：[酒酒小公主專區](https://photos.app.goo.gl/SSkWDqfftkUoM7gw7)
   * 店內與菜色相簿：[川魚堂食材與裝潢](https://photos.app.goo.gl/VHYnUuuXgW4dqfGZ7)
2. **放入資料夾**：將下載的照片放入此 `images/` 資料夾中。
3. **重新命名**：依照下方「圖片檔案對照表」將相片命名。
4. **修改 HTML（如副檔名不同）**：
   * 如果您的照片是 `.jpg`、`.png` 或 `.webp`，請用記事本或編輯器打開專案根目錄的 `index.html`。
   * 使用搜尋功能將對應圖片的副檔名從 `.svg` 修改為您的相片副檔名（例如：將 `images/hero-1.svg` 改成 `images/hero-1.jpg`）。
   * 存檔後重新整理網頁，您的真實照片就會立即顯示並啟用隨機輪播！

---

## 圖片檔案對照表

| HTML 中使用的路徑 | 建議相片內容 | 預設檔案 (已存在) |
| :--- | :--- | :--- |
| `images/logo.svg` | 川魚堂招牌 Logo (若您有自己設計的圖，可修改 HTML 替換) | `logo.svg` |
| `images/hero-1.svg` | 首頁大圖第一張（建議放：最澎派的火鍋菜色照） | `hero-1.svg` |
| `images/hero-2.svg` | 首頁大圖第二張（建議放：店鋪內溫暖有質感的一角） | `hero-2.svg` |
| `images/hero-3.svg` | 首頁大圖第三張（建議放：招牌特寫或店門外觀） | `hero-3.svg` |
| `images/jiujiu-1.svg` | 酒酒小公主專區（建議放：布偶貓酒酒呆萌看鏡頭照） | `jiujiu-1.svg` |
| `images/jiujiu-2.svg` | 酒酒小公主專區（建議放：酒酒慵懶睡覺照） | `jiujiu-2.svg` |
| `images/jiujiu-3.svg` | 酒酒小公主專區（建議放：酒酒玩耍或與客人互動照） | `jiujiu-3.svg` |

---

## 💡 小貼士
* 建議首頁大圖（`hero-1`, `hero-2`, `hero-3`）寬度在 1200px 至 1600px 之間，並以橫式（Landscape）構圖為主，這樣在各裝置上的顯示效果最好。
* 建議酒酒專區（`jiujiu-1`, `jiujiu-2`, `jiujiu-3`）採用接近正方形（1:1）比例的相片，能夠完美契合網頁上的貓咪生活寫真牆！
