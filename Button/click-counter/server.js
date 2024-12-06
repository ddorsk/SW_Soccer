const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// 게시글 목록 로드 함수
function loadPosts() {
  const data = fs.readFileSync('posts.txt', 'utf8');
  const posts = data.split('\n').map(line => {
    const [id, title, content, date] = line.split('|');
    return { id, title, content, date };
  }).filter(post => post.id && post.title && post.content); // id, title, content가 없는 항목은 필터링

  return posts.reverse();  // 최신글이 위로 오도록 배열을 뒤집습니다.
}

// 게시글 목록 페이지
app.get('/', (req, res) => {
  const posts = loadPosts();
  res.render('index', { posts });
});

// 게시글 작성 페이지
app.get('/create', (req, res) => {
  res.render('create');
});

// 게시글 작성 처리
app.post('/create', (req, res) => {
  const { title, content } = req.body;
  const posts = loadPosts();

  const newId = posts.length > 0 ? parseInt(posts[0].id) + 1 : 1;
  const date = new Date().toLocaleString();
  const newPost = `${newId}|${title}|${content}|${date}\n`;

  fs.appendFileSync('posts.txt', newPost);
  res.redirect('/');
});

// 게시글 상세 페이지
app.get('/posts/:id', (req, res) => {
  const posts = loadPosts();
  const post = posts.find(p => p.id === req.params.id);
  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

// 게시글 삭제 처리
app.post('/posts/:id/delete', (req, res) => {
  const posts = loadPosts();
  const postId = req.params.id;

  // 삭제할 게시글을 제외한 새로운 배열 생성
  const updatedPosts = posts.filter(post => post.id !== postId);

  // 업데이트된 게시글 목록을 최신글이 위로 오도록 정렬한 후 저장
  const updatedData = updatedPosts
    .map(post => `${post.id}|${post.title}|${post.content}|${post.date}`)
    .reverse()  // 최신글이 위로 오도록 배열을 뒤집음
    .join('\n');

  // 파일 내용 갱신: 마지막에 새로운 줄 추가
  fs.writeFileSync('posts.txt', updatedData + '\n');

  // 삭제 후 게시글 목록 페이지로 리디렉션
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
