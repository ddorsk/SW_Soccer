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
    const [id, title, content, date, username, team] = line.split('|');
    return { id, title, content, date, username, team };
  }).filter(post => post.id && post.title && post.content);

  return posts.reverse();  // 최신글이 위로 오도록 배열을 뒤집음
}

// 게시글 목록 페이지
app.get('/', (req, res) => {
  const posts = loadPosts();
  res.render('index', { posts });
});

// 각 팀 게시글 페이지
app.get('/team/:team', (req, res) => {
  const team = req.params.team;
  const posts = loadPosts().filter(post => post.team === team);
  res.render('index', { posts });
});

// 기타 팀 게시글 페이지
app.get('/other', (req, res) => {
  const posts = loadPosts().filter(post => 
    !['맨시티', '첼시', '토트넘', '아스날', '맨유', '리버풀'].includes(post.team)
  );
  res.render('index', { posts });
});

// 전체 게시글 페이지
app.get('/all', (req, res) => {
  const posts = loadPosts();  // 모든 게시글을 필터링 없이 가져옴
  res.render('index', { posts });
});

// 게시글 상세 페이지 (ID로 찾기)
app.get('/posts/:id', (req, res) => {
  const postId = req.params.id;
  const posts = loadPosts();
  const post = posts.find(p => p.id === postId);

  if (post) {
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

// 게시글 작성 페이지
app.get('/create', (req, res) => {
  res.render('create', { errorMessage: '', teams: ['맨시티', '첼시', '토트넘', '아스날', '맨유', '리버풀', '기타'] });
});

// 게시글 작성 처리
app.post('/create', (req, res) => {
  const { title, content, username, password, team, otherTeam } = req.body;

  // 사용자가 "기타"를 선택한 경우 다른 팀 이름을 사용
  const teamName = team === '기타' ? otherTeam : team;

  const usersFilePath = '/var/www/html/users.txt';
  const users = fs.readFileSync(usersFilePath, 'utf8').split('\n');

  const user = users.find(user => {
    const [savedUsername, savedPassword, age, gender, userTeam] = user.split(',');
    return savedUsername === username && savedPassword === password;
  });

  if (user) {
    const posts = loadPosts();
    const newId = posts.length > 0 ? parseInt(posts[0].id) + 1 : 1;
    const date = new Date().toLocaleString();
    const newPost = `${newId}|${title}|${content}|${date}|${username}|${teamName}\n`;

    fs.appendFileSync('posts.txt', newPost);
    res.redirect('/');
  } else {
    res.render('create', { errorMessage: '아이디 또는 비밀번호가 일치하지 않습니다.', teams: ['맨시티', '첼시', '토트넘', '아스날', '맨유', '리버풀', '기타'] });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
