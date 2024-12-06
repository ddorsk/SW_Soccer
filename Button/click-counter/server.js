const express = require('express');
const fs = require('fs');
const session = require('express-session');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// 세션 설정
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// 게시글 목록 로드 함수
function loadPosts() {
  const data = fs.readFileSync('posts.txt', 'utf8');
  const posts = data.split('\n').map(line => {
    const [id, title, content, date, username] = line.split('|');
    return { id, title, content, date, username };
  }).filter(post => post.id && post.title && post.content);

  return posts.reverse();  // 최신글이 위로 오도록 배열을 뒤집음
}

// 게시글 목록 페이지
app.get('/', (req, res) => {
  const posts = loadPosts();
  res.render('index', { posts });
});

// 게시글 상세 페이지 (ID로 찾기)
app.get('/posts/:id', (req, res) => {
  const postId = req.params.id;  // URL에서 게시글 ID를 가져옴
  const posts = loadPosts();     // 게시글 목록을 가져옴
  
  // 게시글 ID에 맞는 게시글을 찾음
  const post = posts.find(p => p.id === postId);

  if (post) {
    // 게시글을 찾으면 상세 페이지를 렌더링
    res.render('post', { post });
  } else {
    // 게시글을 찾을 수 없으면 404 에러 페이지로 이동
    res.status(404).send('Post not found');
  }
});

// 게시글 작성 페이지
app.get('/create', (req, res) => {
  res.render('create', { errorMessage: '' });  // errorMessage를 빈 문자열로 전달
});

// 게시글 작성 처리
app.post('/create', (req, res) => {
  const { title, content, username, password } = req.body;

  // 사용자 정보 확인
  const usersFilePath = 'C:\\Users\\kkw12\\OneDrive\\문서\\SW_Soccer\\SCHEDULE\\users.txt';
  const users = fs.readFileSync(usersFilePath, 'utf8').split('\n');

  const user = users.find(user => {
    const [savedUsername, savedPassword, gender, favorite_team] = user.split(',');
    return savedUsername === username && savedPassword === password;  // 평문 비밀번호 비교
  });

  if (user) {
    // 로그인 성공 후, 게시글 작성
    const posts = loadPosts();
    const newId = posts.length > 0 ? parseInt(posts[0].id) + 1 : 1;
    const date = new Date().toLocaleString();
    const newPost = `${newId}|${title}|${content}|${date}|${username}\n`;

    fs.appendFileSync('posts.txt', newPost);
    res.redirect('/');
  } else {
    // 로그인 실패 시 에러 메시지를 전달하여 다시 글 작성 페이지로 리디렉션
    res.render('create', { errorMessage: '아이디 또는 비밀번호가 일치하지 않습니다.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
