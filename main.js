// Article class
class Article {
    constructor(id, title, content, category, author) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = author;
    }

    display() {
        console.log(`Title: ${this.title}`);
        console.log(`Category: ${this.category}`);
        console.log(`Author: ${this.author}`);
        console.log(`Content: ${this.content}`);
    }
}

// User class
class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.savedArticles = [];
    }

    saveArticle(article) {
        this.savedArticles.push(article);
        console.log(`${this.name} saved the article: ${article.title}`);
    }

    viewSavedArticles() {
        console.log(`${this.name}'s saved articles:`);
        this.savedArticles.forEach(article => article.display());
    }
}

// Encyclopedia class
class Encyclopedia {
    constructor() {
        this.articles = [];
    }

    addArticle(article) {
        this.articles.push(article);
        console.log(`Article '${article.title}' added.`);
    }

    findArticlesByCategory(category) {
        return this.articles.filter(article => article.category === category);
    }

    findArticleByTitle(title) {
        return this.articles.find(article => article.title === title);
    }

    displayAllArticles() {
        this.articles.forEach(article => article.display());
    }
}

// SearchEngine class - Open for extension
class SearchEngine {
    static searchByTitle(encyclopedia, title) {
        const article = encyclopedia.findArticleByTitle(title);
        if (article) {
            article.display();
        } else {
            console.log(`Article with title '${title}' not found.`);
        }
    }

    static searchByCategory(encyclopedia, category) {
        const articles = encyclopedia.findArticlesByCategory(category);
        if (articles.length > 0) {
            articles.forEach(article => article.display());
        } else {
            console.log(`No articles found in category '${category}'.`);
        }
    }
}

// Example usage:

// Create a new Encyclopedia instance
const myEncyclopedia = new Encyclopedia();

// Create some articles
const article1 = new Article(1, "JavaScript Basics", "JavaScript is a programming language...", "Programming", "John Doe");
const article2 = new Article(2, "History of Art", "Art has a long history...", "Art", "Jane Doe");
const article3 = new Article(3, "Python for Data Science", "Python is widely used in Data Science...", "Programming", "John Doe");

// Add articles to encyclopedia
myEncyclopedia.addArticle(article1);
myEncyclopedia.addArticle(article2);
myEncyclopedia.addArticle(article3);

// Create a user
const user1 = new User(1, "Alice", "alice@example.com");

// User saves an article
user1.saveArticle(article1);

// Display saved articles
user1.viewSavedArticles();

// Search for articles
SearchEngine.searchByTitle(myEncyclopedia, "History of Art");
SearchEngine.searchByCategory(myEncyclopedia, "Programming");

// Тести

// const { Article } = require('./path_to_your_classes');

describe('Article class', () => {
  test('should create a new article', () => {
    const article = new Article(1, 'JavaScript Basics', 'JavaScript content', 'Programming', 'John Doe');
    
    expect(article.id).toBe(1);
    expect(article.title).toBe('JavaScript Basics');
    expect(article.content).toBe('JavaScript content');
    expect(article.category).toBe('Programming');
    expect(article.author).toBe('John Doe');
  });

  test('should display article details', () => {
    const article = new Article(1, 'JavaScript Basics', 'JavaScript content', 'Programming', 'John Doe');
    console.log = jest.fn(); // Mock console.log to test output

    article.display();

    expect(console.log).toHaveBeenCalledWith('Title: JavaScript Basics');
    expect(console.log).toHaveBeenCalledWith('Category: Programming');
    expect(console.log).toHaveBeenCalledWith('Author: John Doe');
    expect(console.log).toHaveBeenCalledWith('Content: JavaScript content');
  });
});

const { User, Article } = require('./path_to_your_classes');

describe('User class', () => {
  let user;
  let article;

  beforeEach(() => {
    user = new User(1, 'Alice', 'alice@example.com');
    article = new Article(1, 'JavaScript Basics', 'JavaScript content', 'Programming', 'John Doe');
  });

  test('should create a new user', () => {
    expect(user.id).toBe(1);
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
  });

  test('should save an article', () => {
    user.saveArticle(article);
    expect(user.savedArticles).toContain(article);
  });

  test('should view saved articles', () => {
    user.saveArticle(article);
    console.log = jest.fn(); // Mock console.log to test output

    user.viewSavedArticles();

    expect(console.log).toHaveBeenCalledWith("Alice's saved articles:");
    expect(console.log).toHaveBeenCalledWith('Title: JavaScript Basics');
  });
});

const { Encyclopedia, Article } = require('./path_to_your_classes');

describe('Encyclopedia class', () => {
  let encyclopedia;
  let article1, article2;

  beforeEach(() => {
    encyclopedia = new Encyclopedia();
    article1 = new Article(1, 'JavaScript Basics', 'JavaScript content', 'Programming', 'John Doe');
    article2 = new Article(2, 'History of Art', 'Art content', 'Art', 'Jane Doe');
  });

  test('should add an article to the encyclopedia', () => {
    encyclopedia.addArticle(article1);
    expect(encyclopedia.articles).toContain(article1);
  });

  test('should find an article by title', () => {
    encyclopedia.addArticle(article1);
    encyclopedia.addArticle(article2);
    
    const foundArticle = encyclopedia.findArticleByTitle('History of Art');
    expect(foundArticle).toBe(article2);
  });

  test('should find articles by category', () => {
    encyclopedia.addArticle(article1);
    encyclopedia.addArticle(article2);

    const foundArticles = encyclopedia.findArticlesByCategory('Programming');
    expect(foundArticles).toContain(article1);
    expect(foundArticles).not.toContain(article2);
  });
});

const { ArticleFactory, TextArticle, VideoArticle } = require('./path_to_your_classes');

describe('ArticleFactory class', () => {
  test('should create a TextArticle', () => {
    const textArticle = ArticleFactory.createArticle('Text', 1, 'JavaScript Basics', 'Content', 'Programming', 'John Doe');
    
    expect(textArticle).toBeInstanceOf(TextArticle);
    expect(textArticle.title).toBe('JavaScript Basics');
  });

  test('should create a VideoArticle', () => {
    const videoArticle = ArticleFactory.createArticle('Video', 2, 'Python for Data Science', 'Video Content', 'Programming', 'Jane Doe');
    
    expect(videoArticle).toBeInstanceOf(VideoArticle);
    expect(videoArticle.title).toBe('Python for Data Science');
  });
});

const { NotificationService, User, Article } = require('./path_to_your_classes');

describe('NotificationService class', () => {
  let notificationService;
  let user;
  let article;

  beforeEach(() => {
    notificationService = new NotificationService();
    user = new User(1, 'Alice', 'alice@example.com');
    article = new Article(1, 'JavaScript Basics', 'JavaScript content', 'Programming', 'John Doe');
    notificationService.subscribe(user);
  });

  test('should notify subscribed users', () => {
    console.log = jest.fn(); // Mock console.log to test output

    notificationService.notifyUsers(article);
    
    expect(console.log).toHaveBeenCalledWith('Notifying Alice about new article: JavaScript Basics');
  });
});

