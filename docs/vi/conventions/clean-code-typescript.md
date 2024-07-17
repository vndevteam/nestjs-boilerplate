# Clean code Typescript

Các khái niệm về Clean Code dành cho TypeScript.

Được lấy cảm hứng từ [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript).

## Mục lục

  1. [Giới thiệu](#giới-thiệu)
  2. [Biến](#biến)
  3. [Hàm](#functions-hàm)
  4. [Đối tượng và cấu trúc dữ liệu](#đối-tượng-và-cấu-trúc-dữ-liệu)
  5. [Lớp](#lớp)
  6. [SOLID](#solid)
  7. [Kiểm thử](#kiểm-thử)
  8. [Xử lý bất động bộ](#xử-lý-bất-động-bộ)
  9. [Xử lý lỗi](#xử-lý-lỗi)
  10. [Định dạng](#định-dạng)
  11. [Chú thích](#chú-thích)
  12. [Các ngôn ngữ khác](#các-ngôn-ngữ-khác)

## Giới thiệu

![Humorous image of software quality estimation as a count of how many expletives
you shout when reading code](https://www.osnews.com/images/comics/wtfm.jpg)

Trong cuốn sách [*Clean Code*](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) của tác giả Robert C. Martin, liệt kê các nguyên tắc thiết kế phần mềm, các nguyên tắc đó cũng được dành cho TypeScript. Nó không phải là một phong cách của một người hay nhóm người. Nó là một hướng dẫn để tạo ra các đoạn code có tính [readable, reusable, and refactorable](https://github.com/ryanmcdermott/3rs-of-software-architecture) khi viết phần mềm có sử dụng TypeScript.

Không phải mọi nguyên tắc được nhắc tới trong tài liệu này đều phải được tuân thủ nghiêm ngặt, thậm chí số nguyên tắc được thống nhất chung có thể sẽ ít hơn trong tài liệu. Đây chỉ là những hướng dẫn và chỉ là những hướng dẫn, nhưng nó là những thức được đúc kết qua nhiều năm của nhóm tác giả *Clean Code*.

Nghề kỹ sư phần mềm của chúng ta mới chỉ có tuổi đời hơn 50 một chút, và chúng ta vẫn đang học hỏi rất nhiều. Khi mà kiến trúc phần mềm cũng tồn tại đủ lâu như ngành kiến trúc, có lẽ chúng ta sẽ có những quy tắc khó hơn bắt buộc phải tuân theo. Hiện tại, những hướng dẫn này đóng vai trò như nền tảng để bạn hoặc nhóm phát triển của bạn có thể đánh giá được chất lượng code khi code TypeScript.

Một điều nữa: Bạn hãy nhớ, việc bạn biết được những điều được mô tả trong tài liệu này, sẽ không lập tức giúp bạn trở thành một nhà phát triển phần mềm tốt, và làm việc nhiều năm với chúng không có nghĩa là bạn sẽ không mắc sai lầm. Mọi đoạn code đều được bắt đầu như một bản nháp, giống như đất sét lúc còn ướt được tạo hình cho tới khi đạt được hình dáng cuối cùng. Cuối cùng, chúng ta sẽ luôn chỉnh sửa những điểm chưa hoàn hảo trong code của mình khi chúng ta đem những được code được xem xét bởi những người đồng nghiệp. Đừng cố gượng ép bản thân vì những bản nháp đầu tiên luôn cần cải thiện. Thay vào đó, cứ code đã!

**[⬆ Trở lại đầu trang](#mục-lục)**

## Biến

### Đặt tên biến có ý nghĩa

Sử dụng tên biến phân biệt, giúp cho người đọc có thể hiểu được sự khác biệt giữa chúng là gì.

**Chưa tốt:**

```ts
function between<T>(a1: T, a2: T, a3: T): boolean {
  return a2 <= a1 && a1 <= a3;
}

```

**Tốt:**

```ts
function between<T>(value: T, left: T, right: T): boolean {
  return left <= value && value <= right;
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Đặt tên biến theo dạng có thể đọc được

Nếu bạn không thể đọc được tên biến, bạn sẽ không thể thảo luận nó với đồng nghiệp, điều đó có nghĩa thứ bạn viết là thứ bỏ đi.

**Chưa tốt:**

```ts
type DtaRcrd102 = {
  genymdhms: Date;
  modymdhms: Date;
  pszqint: number;
}
```

**Tốt:**

```ts
type Customer = {
  generationTimestamp: Date;
  modificationTimestamp: Date;
  recordId: number;
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Sử dụng cùng một từ vựng cho các biến cùng loại

**Chưa tốt:**

```ts
function getUserInfo(): User;
function getUserDetails(): User;
function getUserData(): User;
```

**Tốt:**

```ts
function getUser(): User;
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Sử dụng tên biến có thể tìm kiếm

Sự thật là chúng ta đọc code nhiều hơn việc chúng ta viết. Vì vậy việc viết code có thể đọc và tìm kiếm là vô cùng quan trọng. Sử dụng các giá trị *không được đặt tên* sẽ làm chương trình của chúng ta trở nên khó hiểu và nó sẽ làm *tổn thương* người đọc. Hãy sử dụng các tên biến có thể tìm kiếm. Một số công cụ như [TSLint](https://palantir.github.io/tslint/rules/no-magic-numbers/) có thể giúp chúng ta tìm ra những hằng số chưa được đặt tên.

**Chưa tốt:**

```ts
// Con số 86400000 đại diện cho điều gì?
setTimeout(restart, 86400000);
```

**Tốt:**

```ts
// Định nghĩa giá trị hằng số bằng các chữ cái viết hoa.
const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

setTimeout(restart, MILLISECONDS_IN_A_DAY);
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Sử dụng các biến đã giải thích ý nghĩa của chúng

**Chưa tốt:**

```ts
declare const users: Map<string, User>;

for (const keyValue of users) {
  // lặp qua các phần từ trong map users
}
```

**Tốt:**

```ts
declare const users: Map<string, User>;

for (const [id, user] of users) {
  // lặp qua các phần từ trong map users
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tránh việc ánh xạ hàm ý

Biểu thị rõ ràng sẽ tốt hơn việc hàm ý

*Rõ ràng là Vua.*

**Chưa tốt:**

```ts
const u = getUser();
const s = getSubscription();
const t = charge(u, s);
```

**Tốt:**

```ts
const user = getUser();
const subscription = getSubscription();
const transaction = charge(user, subscription);
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Không thêm những mô tả không cần thiết

Nếu tên của class/type/object đã nói cho bạn điều gì đó, thì đừng lặp lại điều đó trong tên biến.

**Chưa tốt:**

```ts
type Car = {
  carMake: string;
  carModel: string;
  carColor: string;
}

function print(car: Car): void {
  console.log(`${car.carMake} ${car.carModel} (${car.carColor})`);
}
```

**Tốt:**

```ts
type Car = {
  make: string;
  model: string;
  color: string;
}

function print(car: Car): void {
  console.log(`${car.make} ${car.model} (${car.color})`);
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Sử dụng giá trị mặc định cho tham số thay vì dùng cú pháp 3 ngôi hay các đoạn điều kiện

Giá trị tham số mặc định thường rõ ràng hơn các tính toán điều kiện

**Chưa tốt:**

```ts
function loadPages(count?: number) {
  const loadCount = count !== undefined ? count : 10;
  // ...
}
```

**Tốt:**

```ts
function loadPages(count: number = 10) {
  // ...
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Sử dụng enum để ghi lại ý định sử dụng biến

Enum có thể giúp bạn ghi lại ý nghĩa của biến trong nhiều trường hợp. Ví dụ, chúng ta chỉ quan tâm tới các giá trị khác nhau chứ không quan tâm tới giá trị chính xác.

**Chưa tốt:**

```ts
const GENRE = {
  ROMANTIC: 'romantic',
  DRAMA: 'drama',
  COMEDY: 'comedy',
  DOCUMENTARY: 'documentary',
}

projector.configureFilm(GENRE.COMEDY);

class Projector {
  // delactation of Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
        // some logic to be executed
    }
  }
}
```

**Tốt:**

```ts
enum GENRE {
  ROMANTIC,
  DRAMA,
  COMEDY,
  DOCUMENTARY,
}

projector.configureFilm(GENRE.COMEDY);

class Projector {
  // delactation of Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
        // some logic to be executed
    }
  }
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

## Functions (Hàm)

### Tham số hàm (2 tham số hoặc ít hơn là lý tưởng)

Giới hạn số lượng tham số của hàm là vô cùng quan trọng vì nó giúp cho việc kiểm thử hàm của bạn trở nên dễ dàng hơn.
Có nhiều hơn 3 tham số, nghĩa là bạn có tổ hợp các trường hợp phải kiểm tra khác nhau cho từng tham số riêng biệt.

Một hoặc hai tham số là lý tưởng, và ba tham số thì nên tránh nếu có thể. Tất cả các trường hợp nhiều hơn 3 đều phải xem xét lại. Thông thường, nếu hàm của bạn có nhiều hơn 2 tham số, có nghĩa là hàm của bạn đang phải thực hiện quá nhiều chức năng cùng lúc. Trong trường hợp không phải như vậy, hầu hết trong mọi trường hợp, các bạn có thể thay thế các tham số bằng một tham số là một object.

Khi bạn thấy mình cần rất nhiều tham số, hãy cân nhắc sử dụng một đối tượng.

Để làm cho các thuộc tính của một hàm được rõ ràng hơn, các bạn có thể sử dụng cú pháp [destructuring](https://basarat.gitbook.io/typescript/future-javascript/destructuring).

Nó có một vài ưu điểm sau:

1. Khi ai đó nhìn vào tài liệu của một hàm, mọi thứ sẽ rõ ràng, những thuộc tính nào sẽ được sử dụng.

2. Nó có thể sử dụng để đại diện cho các tham số.

3. Các kiểu dữ liệu nguyên thủy sẽ là tham trị khi được truyền vào theo cách này. Điều này giúp ngăn ngừa các tác dụng phụ(đối tượng truyền vào bị biến đổi sau khi thực hiện hàm). Chú ý: object và array sẽ bị truyền vào như các tham biến(thay đổi giá trị trong hàm sẽ làm thay đổi giá trị của đối tượng được truyền vào).

4. TypeScript sẽ cảnh bảo cho bạn những tham số nào không được sử dụng, điều này là không thể nếu không có cú pháp destructuring(??).

**Chưa tốt:**

```ts
function createMenu(title: string, body: string, buttonText: string, cancellable: boolean) {
  // ...
}

createMenu('Foo', 'Bar', 'Baz', true);
```

**Tốt:**

```ts
function createMenu(options: { title: string, body: string, buttonText: string, cancellable: boolean }) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});
```

Bạn có thể cải thiện độ dễ đọc của code hơn nữa bằng cách sử dụng [type aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases):

```ts

type MenuOptions = { title: string, body: string, buttonText: string, cancellable: boolean };

function createMenu(options: MenuOptions) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Mỗi hàm chỉ nên làm một việc

Đây là quy tắc quan trọng nhất trong công nghệ phần mềm. Khi một hàm làm nhiều hơn một việc, nó sẽ trở nên khó viết hơn, khó kiểm thử hơn. Khi bạn có thể thiết kế một hàm chỉ làm một việc độc lập, việc thay đổi sau này sẽ dễ dàng hơn nhiều, và code của bạn sẽ dễ đọc hơn, sạch hơn. Nếu bạn làm theo được hướng dẫn này, bạn sẽ đi trước nhiều nhà phát triển phần mềm khác.

**Chưa tốt:**

```ts
function emailClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Tốt:**

```ts
function emailClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tên của hàm nên đại diện cho chức năng của nó

**Chưa tốt:**

```ts
function addToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();

// Nếu chỉ nhìn vào tên hàm, quá khó để biết được nó sẽ thêm vào cái gì
addToDate(date, 1);
```

**Tốt:**

```ts
function addMonthToDate(date: Date, month: number): Date {
  // ...
}

const date = new Date();
addMonthToDate(date, 1);
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Hàm chỉ nên có một mức độ trừu tượng(abstraction)

Khi hàm của bạn có nhiều hơn một mức độ trừu tượng, nó thường sẽ làm quá nhiều chức năng. Việc tách nhỏ thành nhiều hàm giúp bạn tái sử dụng code và dễ dàng kiểm thử hơn.

**Chưa tốt:**

```ts
function parseCode(code: string) {
  const REGEXES = [ /* ... */ ];
  const statements = code.split(' ');
  const tokens = [];

  REGEXES.forEach((regex) => {
    statements.forEach((statement) => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach((token) => {
    // lex...
  });

  ast.forEach((node) => {
    // parse...
  });
}
```

**Tốt:**

```ts
const REGEXES = [ /* ... */ ];

function parseCode(code: string) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);

  syntaxTree.forEach((node) => {
    // parse...
  });
}

function tokenize(code: string): Token[] {
  const statements = code.split(' ');
  const tokens: Token[] = [];

  REGEXES.forEach((regex) => {
    statements.forEach((statement) => {
      tokens.push( /* ... */ );
    });
  });

  return tokens;
}

function parse(tokens: Token[]): SyntaxTree {
  const syntaxTree: SyntaxTree[] = [];
  tokens.forEach((token) => {
    syntaxTree.push( /* ... */ );
  });

  return syntaxTree;
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Loại bỏ những đoạn code bị lặp

Hãy làm tất cả mọi thứ mà bạn biết để tránh việc lặp lại code.
Lặp code là một điều rất tệ bởi vì như thế có nghĩa là sẽ có nhiều hơn một nơi phải sửa nếu sau này bạn thay đổi một vài logic code.

Tưởng tượng, bạn quản lý một nhà hàng và bạn phải theo dõi hàng tồn trong kho: Tất cả cà chua, hành tây, tỏi, gia vị...Nếu bạn có nhiều danh sách để theo dõi số lượng của chúng, thì tất cả phải được cập nhật khi nhà hàng phục vụ một món ăn mà trong đó có cà chua.
Nếu bạn chỉ có một danh sách, thì chỉ có một nơi phải cập nhật!

Thông thường, code của bạn bị lặp vì bạn có hai hay nhiều thứ chỉ hơi hơi khác nhau, chúng có nhiều điểm chung, nhưng sự khác biệt của chúng bắt buộc bạn phải có 2 hoặc nhiều hàm riêng biệt làm những công việc giống nhau. Loại bỏ việc lặp code có nghĩa là bạn tạo ra một thứ trừu tượng, thứ đó có thể tập hợp và xử lý những điểm khác nhau ở trên, nó có thể là một hàm, module hay một lớp(function/module/class).

Việc tạo ra một trừu tượng đúng là rất quan trọng, đó là lý do tại sao bạn nên tuân các nguyên lý [SOLID](#solid). Việc tạo ra một trừu tượng xấu còn tệ hơn việc lặp code, hãy cẩn thận! Như đã nói, nếu bạn có thể tạo ra một trừu tượng, hãy làm nó! Đừng lặp lại chính mình (Don't repeat yourself), nếu không, bạn sẽ phải cập nhập nhiều nơi mỗi khi bạn muốn thay đổi một điều gì đó.

**Chưa tốt:**

```ts
function showDeveloperList(developers: Developer[]) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();

    const data = {
      expectedSalary,
      experience,
      githubLink
    };

    render(data);
  });
}

function showManagerList(managers: Manager[]) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();

    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  });
}
```

**Tốt:**

```ts
class Developer {
  // ...
  getExtraDetails() {
    return {
      githubLink: this.githubLink,
    }
  }
}

class Manager {
  // ...
  getExtraDetails() {
    return {
      portfolio: this.portfolio,
    }
  }
}

function showEmployeeList(employee: Developer | Manager) {
  employee.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();
    const extra = employee.getExtraDetails();

    const data = {
      expectedSalary,
      experience,
      extra,
    };

    render(data);
  });
}
```

Bạn nên đặc biệt chú trọng tới việc lặp code. Đôi khi, có sự đánh đổi giữa việc giữ code bị lặp với việc lằm tăng độ phức tạp bằng việc đưa vào các trừ tượng không cần thiết. Khi việc triển khai code được thực hiện ở hai module khác nhau, trông có vẻ giống nhau nhưng chúng được thực hiện ở các domain khác nhau, việc lặp code có thể chấp nhận được và được ưu tiên hơn so với việc viết một đoạn mã dùng chung cho cả 2 module. Việc viết mã dùng chung trong trường hợp này tạo ra sự phụ thuộc gián tiếp giữa 2 module.

**[⬆ Trở lại đầu trang](#mục-lục)**

### Đặt giá trị mặc định cho các object bằng Object.assign hoặc cú pháp destructuring

**Chưa tốt:**

```ts
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function createMenu(config: MenuConfig) {
  config.title = config.title || 'Foo';
  config.body = config.body || 'Bar';
  config.buttonText = config.buttonText || 'Baz';
  config.cancellable = config.cancellable !== undefined ? config.cancellable : true;

  // ...
}

createMenu({ body: 'Bar' });
```

**Tốt:**

```ts
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function createMenu(config: MenuConfig) {
  const menuConfig = Object.assign({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  }, config);

  // ...
}

createMenu({ body: 'Bar' });
```

Hoặc bạn có thể sử dụng cú pháp `destructuring` với các giá trị mặc định:

```ts
type MenuConfig = { title?: string, body?: string, buttonText?: string, cancellable?: boolean };

function createMenu({ title = 'Foo', body = 'Bar', buttonText = 'Baz', cancellable = true }: MenuConfig) {
  // ...
}

createMenu({ body: 'Bar' });
```

Để tránh các tác dụng phụ và các hành vi không mong muốn khi truyền vào các giá trị `undefined` hoặc `null`, bạn có thể cài đặt để trình biên dịch TypeScript chặn chúng.
Chi tiết, tùy chọn [`--strictNullChecks`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#--strictnullchecks) của TypeScript.

**[⬆ Trở lại đầu trang](#mục-lục)**

### Không sử dụng biến cờ (flag) như là một tham số của hàm

Những tham số cờ cho thấy hàm của bạn làm nhiều hơn một việc. Mỗi hàm chỉ nên làm một việc. Tách các hàm của bạn ra nếu chúng có các rẽ nhánh khác nhau dựa trên một biến boolean.

**Chưa tốt:**

```ts
function createFile(name: string, temp: boolean) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**Tốt:**

```ts
function createTempFile(name: string) {
  createFile(`./temp/${name}`);
}

function createFile(name: string) {
  fs.create(name);
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tránh các tác dụng phụ (phần 1)

Một hàm tạo ra một tác dụng phụ nếu nó làm bất kỳ điều gì khác ngoài lấy một giá trị và trả lại những giá trị khác giá trị của nó.

Một tác dụng phụ có thể là ghi vào một file, thay đổi giá trị của một biến toàn cục, hoặc vô tình chuyển toàn bộ tiền của bạn cho một người lạ...

Bây giờ, đôi khi bạn cần có một "tác dụng phụ" trong một chương trình. Giống như ví dụ ở trên, bạn cần phải ghi dữ liệu vào một tệp. Những gì bạn muốn làm là tập trung vào nơi bạn sẽ làm điều này. Không được có nhiều hàm hay class ghi được vào một file cụ thể. Chỉ có một nơi làm được điều đó. Và chỉ một thôi.

Điểm chính của những nguyên tắc được nêu ở tài liệu này là  để tránh những "cạm bẫy" phổ biến như: Chia sẻ trạng thái của các đối tượng mà không theo cấu trúc nào, sử dụng các kiểu biến có thể thay đổi dữ liệu và có thể ghi vào đó mọi thứ, và không tập trung vào những nơi có thể xảy ra các tác dụng phụ.

Nếu bạn tránh được những điều này, bạn sẽ hạnh phúc hơn đa số các lập trình viên khác.

**Chưa tốt:**

```ts
// Biến toàn cục, giá trị tham chiếu theo các hàm.
let name = 'Robert C. Martin';

function toBase64() {
  name = btoa(name);
}

toBase64();
// Nếu chúng ta có một hàm khác sử dụng biến `name` này, thì giờ giá trị của nó là một Base64 string

console.log(name); // Mong muốn in ra 'Robert C. Martin' nhưng lại nhận được 'Um9iZXJ0IEMuIE1hcnRpbg=='
```

**Good:**

```ts
const name = 'Robert C. Martin';

function toBase64(text: string): string {
  return btoa(text);
}

const encodedName = toBase64(name);
console.log(name);
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tránh các tác dụng phụ (phần 2)

Trong Javascript, những giá trị nguyên thủy (string, number...) được truyền vào hàm theo kiểu tham trị, object và array được truyền vào theo kiểu tham biến. Trong trường hợp của object và array, nếu hàm của bạn tạo ra một một thay đổi trong mảng chứ thông tin giỏ hàng, ví dụ: Thêm một món hàng vào giỏ hàng. Sau đó, mọi hàm khác sử dụng mảng `cart` sẽ bị ảnh hưởng bởi việc thêm vào một món hàng. Điều này có thể khá tuyệt, tuy nhiên nó có thể sẽ rất tệ. Hãy tưởng tượng một trường hợp xấu như sau:

Người dùng bấm vào nút "Thanh toán", việc này sẽ gọi hàm `purchase`, hàm này sẽ tạo ra một network request và gửi mảng `cart` tới máy chủ. Bởi vì chất lượng mạng hơi tệ, yêu cầu chưa được gửi thành công, hàm `purchase` đã thử lại việc gửi yêu cầu tới máy chủ. Ngay lúc này, trước khi yêu cầu được hàm `purchase` gửi đi, chuyện gì sẽ xảy ra nếu người dùng vô tình bấm vào nút "Thêm vào giỏ hàng" của một món đồ họ thực sự không mong muốn? Nếu việc này xảy ra và yêu cầu tới máy chủ được bắt đầu, thì hàm `purchase` sẽ gửi món đồ vô tình được thêm vào mảng `cart`, vì mảng này là giá trị tham chiếu đối với hàm `addItemToCart` - Hàm này đã thêm vào một món đồ không muốn.

Một giải pháp tuyệt vời cho hàm `addItemToCart` là hàm này sẽ luôn tạo ra một bản sao của mảng `cart`, sửa đổi trên bản sao, và trả lại bản sao khi kết thúc hàm. Điều này đảm bảo không một hàm nào đang giữ giá trị của mảng `cart` bị ảnh hưởng bởi bất kỳ thì thay đổi nào.

Hai lưu ý được đề cập tới phương pháp này:

1. Có thể có những trường hợp thực sự bạn muốn thay đổi giá trị đầu vào, nhưng khi bạn áp dụng những thứ được mô tả trong tài liệu này, bạn sẽ thấy trường hợp này là khá hiếm gặp. Hầu hết mọi thứ có thể được tái cấu trúc để tránh tác dụng phục kiểu này! (Xem thêm [pure function](https://en.wikipedia.org/wiki/Pure_function))

2. Việc nhân bản (clone) một đối tượng lớn có thể ảnh hướng lớn tới hiệu suất của chương trình. May mắn thay, trong thực tế thì đây không phải là một vấn đề lớn, vì chúng ta đã có những thư viện tuyệt vời cho phép phương pháp lập trình như thế này nhanh và không tốn nhiều bộ nhớ như khi bạn tự sao chép các array hay object lớn.

**Chưa tốt:**

```ts
function addItemToCart(cart: CartItem[], item: Item): void {
  cart.push({ item, date: Date.now() });
};
```

**Tốt:**

```ts
function addItemToCart(cart: CartItem[], item: Item): CartItem[] {
  return [...cart, { item, date: Date.now() }];
};
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Không viết các hàm toàn cục

"Ô nhiễm" toàn cục là một thực tiễn tồi tệ trong Javascript, bởi vì code bạn có thể đụng độ với những thư viện khác và người dùng của bạn sẽ bị bối rối khi họ gặp một lỗi trên sản phẩm.

Hãy nghĩa tới một ví dụ sau: Chuyện gì sẽ xảy ra nếu bạn muốn mở rộng phương thức của đối tượng Array trong Javascript, để có thêm phương thức `diff` - phương thức trả về những phần tử khác nhau của hai mảng? Bạn có thể sẽ viết phương thức mới của bạn thông qua `Array.prototype`, nhưng nó có thể đụng độ tới những thư viện khác - những thư viện cũng đã làm những việc tương tự. Chuyện gì sẽ xảy ra nếu thư việc khác cũng sử dụng  cái tên `diff` để tìm ra sự khác nhau giữa phần tử đầu tiên và cuối cùng của một mảng? Điều này giải thích tại sao sẽ tốt hơn nhiều nếu như sử dụng một class, nó đơn giản là mở rộng của lớp `Array`.

**Chưa tốt:**

```ts
declare global {
  interface Array<T> {
    diff(other: T[]): Array<T>;
  }
}

if (!Array.prototype.diff) {
  Array.prototype.diff = function <T>(other: T[]): T[] {
    const hash = new Set(other);
    return this.filter(elem => !hash.has(elem));
  };
}
```

**Tốt:**

```ts
class MyArray<T> extends Array<T> {
  diff(other: T[]): T[] {
    const hash = new Set(other);
    return this.filter(elem => !hash.has(elem));
  };
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Ưu tiên lặp trình hàm hơn lập trình mệnh lệnh(imperative programming)

Ưu tiên phong cách lập trình hàm hơn khi bạn có thể.

**Chưa tốt:**

```ts
const contributions = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

let totalOutput = 0;

for (let i = 0; i < contributions.length; i++) {
  totalOutput += contributions[i].linesOfCode;
}
```

**Tốt:**

```ts
const contributions = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

const totalOutput = contributions
  .reduce((totalLines, output) => totalLines + output.linesOfCode, 0);
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Đóng gói các điều kiện

**Chưa tốt:**

```ts
if (subscription.isTrial || account.balance > 0) {
  // ...
}
```

**Tốt:**

```ts
function canActivateService(subscription: Subscription, account: Account) {
  return subscription.isTrial || account.balance > 0
}

if (canActivateService(subscription, account)) {
  // ...
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tránh điều kiện tiêu cực

**Chưa tốt:**

```ts
function isEmailNotUsed(email: string): boolean {
  // ...
}

if (isEmailNotUsed(email)) {
  // ...
}
```

**Tốt:**

```ts
function isEmailUsed(email: string): boolean {
  // ...
}

if (!isEmailUsed(node)) {
  // ...
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tránh các câu điều kiện

Đây được xem như là một việc không thể. Khi nghe điều này lần đầu, hầu hết mọi người đều nói, "Làm thế nào mà tôi có thể làm gì đó mà không dùng câu điều `if`?" Câu trả lời là bạn có thể sử dụng tính đa hình để đạt được cùng nhiệm vụ trong nhiều trường hợp mà không cần dùng tới các câu điều kiện. Câu hỏi thường gặp thứ hai là "Nghe có vẻ tuyệt, nhưng tại sao tôi nên làm điều đó?" Câu trả lời là một định nghĩa mã sạch ở trên đã mô tả mỗi hàm chỉ nên làm một việc. Khi bạn có các lớp và các hàm mà chúng có câu điều kiện `if`, bạn đang nói với người dùng của mình rằng hàm của bạn làm nhiều hơn một thứ. Hãy nhớ, chỉ làm một việc.

**Chưa tốt:**

```ts
class Airplane {
  private type: string;
  // ...

  getCruisingAltitude() {
    switch (this.type) {
      case '777':
        return this.getMaxAltitude() - this.getPassengerCount();
      case 'Air Force One':
        return this.getMaxAltitude();
      case 'Cessna':
        return this.getMaxAltitude() - this.getFuelExpenditure();
      default:
        throw new Error('Unknown airplane type.');
    }
  }

  private getMaxAltitude(): number {
    // ...
  }
}
```

**Tốt:**

```ts
abstract class Airplane {
  protected getMaxAltitude(): number {
    // shared logic with subclasses ...
  }

  // ...
}

class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}

class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tránh việc kiểm tra kiểu dữ liệu

TypeScript là một siêu cú pháp ngữ kiểu soát kiểu dữ liệu chặt chẽ cho JavaScript và thêm các tùy chọn tùy chỉnh kiểm tra kiểu dữ liệu.

Luôn luôn ưu tiên chỉ định chính xác kiểu dữ liệu của các biến, tham số và kiểu trả về để tận dụng tối đa sức mạnh của các tính năng được cung cấp bởi TypeScript.

Nó làm cho việc tái cấu trúc code dễ dàng hơn.

**Chưa tốt:**

```ts
function travelToTexas(vehicle: Bicycle | Car) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(currentLocation, new Location('texas'));
  } else if (vehicle instanceof Car) {
    vehicle.drive(currentLocation, new Location('texas'));
  }
}
```

**Tốt:**

```ts
type Vehicle = Bicycle | Car;

function travelToTexas(vehicle: Vehicle) {
  vehicle.move(currentLocation, new Location('texas'));
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Đừng quá chú tâm vào việc tối ưu

Những trình duyệt web hiện đại đã thực hiện tối ưu hóa rất nhiều trong quá trình thực thi. Nhiều lúc, nếu bạn đang cố tối ưu hóa gì đó thì có thể bạn đang chỉ lãng phí thời gian của mình. Đây là một [tài liệu](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers) mô tả những nơi thiếu sự tối ưu hóa. Cứ ghi nhớ những phần đó, cho đến khi họ sửa được chúng, nếu có thể.

**Chưa tốt:**

```ts
// Ở những trình duyệt cũ, mỗi lần lặp  việc không lưu lại giá trị `list.length` có thể làm tốn thêm chi phí
// bởi vì giá trị của `list.length` sẽ được tính toán lại. Ở những trình duyệt hiện đại, điều này đã được tối ưu.
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

**Tốt:**

```ts
for (let i = 0; i < list.length; i++) {
  // ...
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Loại bỏ code không được sử dụng

Giữ lại các đoạn code mà không sử dụng cũng tệ như việc lặp code. Không có lý do gì để giữ chúng lại trong codebase của bạn.

Nếu nó không được gọi, bỏ nó đi! Nó vẫn sẽ an toàn trong lịch sử sửa đổi code nếu bạn vẫn còn cần tới nó.

**Chưa tốt:**

```ts
function oldRequestModule(url: string) {
  // ...
}

function requestModule(url: string) {
  // ...
}

const req = requestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

**Tốt:**

```ts
function requestModule(url: string) {
  // ...
}

const req = requestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Sử dụng biến lặp(iterator) và bộ sinh(generator)

Sử dụng generators và iterables khi làm việc với các mảng dữ liệu như làm việc với một luồng(stream) dữ liệu.

Có một vài lý do tốt:

- Tách đối tượng được gọi (callee) khỏi tiến trình khởi tạo nghĩa là đối tượng được gọi sẽ quyết định có bao nhiều phần tử được truy cập.
- Tải chậm (lazy load), các phần từ được truyền lại theo yêu cầu
- Mặc định hỗ trợ lặp qua các phần tử bằng cách sử dụng cú pháp `for-of`
- iterables cho phép thực hiện các mẫu lặp (iterator patterns) đã được tối ưu hóa

**Chưa tốt:**

```ts
function fibonacci(n: number): number[] {
  if (n === 1) return [0];
  if (n === 2) return [0, 1];

  const items: number[] = [0, 1];
  while (items.length < n) {
    items.push(items[items.length - 2] + items[items.length - 1]);
  }

  return items;
}

function print(n: number) {
  fibonacci(n).forEach(fib => console.log(fib));
}

// In ra 10 số Fibonacci đầu tiên.
print(10);
```

**Tốt:**

```ts
// Khởi tạo một dãy stream vô hạn các số Fibonacci
// Bộ sinh (generator) không giữ mảng của tất cả các số.
function* fibonacci(): IterableIterator<number> {
  let [a, b] = [0, 1];

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function print(n: number) {
  let i = 0;
  for (const fib of fibonacci()) {
    if (i++ === n) break;
    console.log(fib);
  }
}

// In ra 10 số Fibonacci đầu tiên.
print(10);
```

Đây là một số thư viện cho phép làm việc với các biến lặp với cách quen thuộc như làm việc với các mảng thuông thường, bằng các phương thức chuỗi (chaining methods) như `map`, `slice`, `forEach` ... Xem thêm [itiriri](https://www.npmjs.com/package/itiriri) - một ví dụ thao tác nâng cao với các biến lặp (hay [itiriri-async](https://www.npmjs.com/package/itiriri-async) - thao tác với các biến lặp bất động bộ).

```ts
import itiriri from 'itiriri';

function* fibonacci(): IterableIterator<number> {
  let [a, b] = [0, 1];

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

itiriri(fibonacci())
  .take(10)
  .forEach(fib => console.log(fib));
```

**[⬆ Trở lại đầu trang](#mục-lục)**

## Đối tượng và cấu trúc dữ liệu

### Sử dụng getter và setter

TypeScript hỗ trợ cú pháp getter/setter. Việc sử dụng getter và setter để đóng gói các hành vi khi làm việc với dữ liệu của object sẽ tốt hơn việc đơn giản lấy một một thuộc trên một đối tượng. Bạn có thể hỏi "Tại sao?". Tốt, đây là danh sách những lý do:

- Khi bạn muốn làm nhiều hơn ngoài việc có được một thuộc tính của đối tượng, bạn không cần phải tìm kiếm và thay đổi mọi chỗ lấy thuộc tính đó trong codebase của bạn.
- Đơn giản để thêm vào các sự kiểm soát hợp lệ khi làm việc với một `set`.
- Đóng gói các logic nội bộ.
- Dễ thêm vào logging và xử lý lỗi khi sét hay lấy giá trị.
- Bạn có thể thực hiện việc tải chậm các thuộc tính của đối tượng, giả sử nó được lấy từ máy chủ.

**Chưa tốt:**

```ts
type BankAccount = {
  balance: number;
  // ...
}

const value = 100;
const account: BankAccount = {
  balance: 0,
  // ...
};

if (value < 0) {
  throw new Error('Cannot set negative balance.');
}

account.balance = value;
```

**Tốt:**

```ts
class BankAccount {
  private accountBalance: number = 0;

  get balance(): number {
    return this.accountBalance;
  }

  set balance(value: number) {
    if (value < 0) {
      throw new Error('Cannot set negative balance.');
    }

    this.accountBalance = value;
  }

  // ...
}

// Giờ `BankAccount` đóng gói logic kiểm soát dữ liệu.
// Nếu một ngày các yêu cầu thay đổi, và chúng ta cần thêm vào các quy tắc kiểm soát,
// chúng ta sẽ chỉ thực hiện sửa đổi ở `setter`,
// giữ nguyên tất cả các đoạn mã phụ thuộc.
const account = new BankAccount();
account.balance = 100;
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tạo ra những đối tượng có thuộc tính private/protected

TypeScript hỗ trợ các kiểu truy cập tới thuộc tính của lớp: `public` *(mặc định)*, `protected` và `private`.

**Chưa tốt:**

```ts
class Circle {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  surface() {
    return Math.PI * this.radius * this.radius;
  }
}
```

**Tốt:**

```ts
class Circle {
  constructor(private readonly radius: number) {
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  surface() {
    return Math.PI * this.radius * this.radius;
  }
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Ưu tiên tính bất biến

Hệ thống kiểu dữ liệu của TypeScript cho phép bạn đánh dấu những thuộc tính riêng lẻ của một interface / lớp là *chỉ đọc* (readonly). Điều này cho phép làm việc theo kiểu hướng hàm (những đột biến bất ngờ là không tốt).
Đối với các kịch bản nâng cao, có một kiểu dữ liệu được tích hợp sẵn `Readonly` trong TypeScript, kiểu dữ liệu này sẽ trả lại kiểu dữ liệu `T` và biến tất cả các thuộc tính của của `T` thành kiểu chỉ đọc bằng cách sử dụng kiểu ánh xạ (xem thêm [mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)).

**Chưa tốt:**

```ts
interface Config {
  host: string;
  port: string;
  db: string;
}
```

**Tốt:**

```ts
interface Config {
  readonly host: string;
  readonly port: string;
  readonly db: string;
}
```

Trường hợp của Array, bạn có thể tạo ra một mảng chỉ đọc bằng cách sử dụng `ReadonlyArray<T>`. Không cho phép các thay đổi như `push()` và `fill()`, nhưng có thể sử dụng các tính năng như là `concat()` và `slice()`, những tính năng này không làm thay đổi dữ liệu.

**Chưa tốt:**

```ts
const array: number[] = [ 1, 3, 5 ];
array = []; // error
array.push(100); // array will updated
```

**Tốt:**

```ts
const array: ReadonlyArray<number> = [ 1, 3, 5 ];
array = []; // error
array.push(100); // error
```

Khởi tạo các tham số chỉ đọc in [TypeScript 3.4 sẽ dễ dàng hơn một chút](https://github.com/microsoft/TypeScript/wiki/What's-new-in-TypeScript#improvements-for-readonlyarray-and-readonly-tuples)

```ts
function hoge(args: readonly string[]) {
  args.push(1); // error
}
```

Ưu tiên [khẳng định hằng số](https://github.com/microsoft/TypeScript/wiki/What's-new-in-TypeScript#const-assertions) cho các giá trị biến số (literal values)

**Chưa tốt:**

```ts
const config = {
  hello: 'world'
};
config.hello = 'world'; // value is changed

const array  = [ 1, 3, 5 ];
array[0] = 10; // value is changed

// writable objects is returned
function readonlyData(value: number) {
  return { value };
}

const result = readonlyData(100);
result.value = 200; // value is changed
```

**Tốt:**

```ts
// read-only object
const config = {
  hello: 'world'
} as const;
config.hello = 'world'; // error

// read-only array
const array  = [ 1, 3, 5 ] as const;
array[0] = 10; // error

// You can return read-only objects
function readonlyData(value: number) {
  return { value } as const;
}

const result = readonlyData(100);
result.value = 200; // error
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### type vs. interface

Sử dụng type khi bạn cần một hoặc kết hợp hoặc sự giao thoa. Sử dụng interface khi bạn muốn `extends` hoặc `implements`. Không có quy tắc nghiêm ngặt nào, tuy nhiên, hãy sử dụng nguyên tắc phù hợp với bạn.
Để được giải thích chi tiết hơn, hãy tham khảo [câu trả lời này](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/54101543#54101543) về sự khác biệt giữa  `type` và `interface` trong TypeScript.

**Chưa tốt:**

```ts
interface EmailConfig {
  // ...
}

interface DbConfig {
  // ...
}

interface Config {
  // ...
}

//...

type Shape = {
  // ...
}
```

**Tốt:**

```ts

type EmailConfig = {
  // ...
}

type DbConfig = {
  // ...
}

type Config  = EmailConfig | DbConfig;

// ...

interface Shape {
  // ...
}

class Circle implements Shape {
  // ...
}

class Square implements Shape {
  // ...
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

## Lớp

### Các lớp nên nhỏ gọn

Quy mô của các lớp được đo bằng trách nhiệm của nó. Theo nguyên tắc *Trách nhiệm duy nhất(Single Responsibility principle)* một lớp nên nhỏ gọn.

**Chưa tốt:**

```ts
class Dashboard {
  getLanguage(): string { /* ... */ }
  setLanguage(language: string): void { /* ... */ }
  showProgress(): void { /* ... */ }
  hideProgress(): void { /* ... */ }
  isDirty(): boolean { /* ... */ }
  disable(): void { /* ... */ }
  enable(): void { /* ... */ }
  addSubscription(subscription: Subscription): void { /* ... */ }
  removeSubscription(subscription: Subscription): void { /* ... */ }
  addUser(user: User): void { /* ... */ }
  removeUser(user: User): void { /* ... */ }
  goToHomePage(): void { /* ... */ }
  updateProfile(details: UserDetails): void { /* ... */ }
  getVersion(): string { /* ... */ }
  // ...
}

```

**Tốt:**

```ts
class Dashboard {
  disable(): void { /* ... */ }
  enable(): void { /* ... */ }
  getVersion(): string { /* ... */ }
}

// tách các trách nhiệm của lớp bằng cách chuyển những phương thức còn lại sang các lớp khác
// ...
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Sự gắn kết cao và sự móc nối thấp(High cohesion and low coupling)

Sự gắn kết xác định mức độ các thành phần (thuộc tính, phương thức) của lớp có liên quan với nhau. Lý tưởng nhất là, mỗi phương thức của lớp đều sử dụng tất cả các thuộc tính của một lớp.
Chúng ta gọi lớp đó là *gắn kết tối đa* (maximally cohesive). Trong thực tế, điều này không phải lúc nào cũng có thể đạt được, thậm chí là không nên. Tuy nhiên, bạn nên ưu tiên sự gắn kết cao.

Sự móc nối đề cập tới mức độ liên quan hay phụ thuộc giữa hai lớp với nhau. Các lớp được cho là có sự móc nối thấp nếu sự thay đổi của một trong số chúng không ảnh hưởng tới những lớp khác.

Một thiết kết phần phầm tốt có *Sự gắn kết cao* và *Sự móc nối thấp*.

**Chưa tốt:**

```ts
class UserManager {
  // Chưa tốt: một thuộc tính riêng được sử dụng bởi một hoặc một nhóm phương thức khác.
  // Điều này là bằng chứng rõ ràng rằng lớp đang nắm giữ nhiều hơn một trách nhiệm.
  // Nếu tôi chỉ muốn tạo một dịch vụ để lấy các phiên giao dịch của csdl cho một người dùng,
  // tôi bắt buộc vẫn phải truyền vào và khởi một đối tượng `emailSender`.
  constructor(
    private readonly db: Database,
    private readonly emailSender: EmailSender) {
  }

  async getUser(id: number): Promise<User> {
    return await db.users.findOne({ id });
  }

  async getTransactions(userId: number): Promise<Transaction[]> {
    return await db.transactions.find({ userId });
  }

  async sendGreeting(): Promise<void> {
    await emailSender.send('Welcome!');
  }

  async sendNotification(text: string): Promise<void> {
    await emailSender.send(text);
  }

  async sendNewsletter(): Promise<void> {
    // ...
  }
}
```

**Tốt:**

```ts
class UserService {
  constructor(private readonly db: Database) {
  }

  async getUser(id: number): Promise<User> {
    return await this.db.users.findOne({ id });
  }

  async getTransactions(userId: number): Promise<Transaction[]> {
    return await this.db.transactions.find({ userId });
  }
}

class UserNotifier {
  constructor(private readonly emailSender: EmailSender) {
  }

  async sendGreeting(): Promise<void> {
    await this.emailSender.send('Welcome!');
  }

  async sendNotification(text: string): Promise<void> {
    await this.emailSender.send(text);
  }

  async sendNewsletter(): Promise<void> {
    // ...
  }
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Ưu tiên sự cấu thành(composition) hơn thừa kế

Như một phát biểu nổi tiếng của [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns) bởi Gang of Four, bạn nên *Ưu tiên sự cấu thành hơn thừa kế* khi bạn có thể. Có nhiều lý do để sử dụng tính kế thừa và cũng có nhiều lý do để sử dụng sự cấu thành. Điểm chính của phần mục này là nếu bạn có suy nghĩ sẽ sử dụng sự kế thừa, hãy thử nghĩ xem liệu sử dụng sự cấu thành có thể mô hình hóa vấn đề của bạn tốt hơn hay không. Trong một số trường hợp sử dụng sự cấu thành sẽ tốt hơn dùng sự kế thừa.

Sau khi đọc đoạn trên, bạn sẽ nghĩ "khi nào tôi nên sử dụng sự kế thừa?". Nó phụ thuộc vào vấn đề mà bạn đang gặp, nhưng đây là một vài vấn đề, mà ở đó sử dụng kế thừa sẽ tốt hơn là sử dụng sự cấu thành:

1. Sự kế thừa của bạn thể hiện mối quan hệ "là một" (is-a) và không phải mối quan hệ "có một" (has-a) (Human -> Animal - Human is a Animal với User -> UserDetails - User has UserDetails).

2. Bạn có thể tái sử dụng mã từ lớp cơ sở (Người - Humans có thể di chuyển như tất cả các động vật - animals).

3. Bạn muốn thực hiện thay đổi toàn cục cho toàn bộ các lớp đã kế thừa từ lớp cơ sở bằng cách thay đổi lớp cơ sở. (Thay đổi cách tính lượng calo tiêu hao của tất cả các động vật khi chúng di chuyển).

**Chưa tốt:**

```ts
class Employee {
  constructor(
    private readonly name: string,
    private readonly email: string) {
  }

  // ...
}

// Chưa tốt, bởi vì Employees "có" (have - "has a") thông tin thuế. Và EmployeeTaxData không phải là một (not is a) kiểu Employee
class EmployeeTaxData extends Employee {
  constructor(
    name: string,
    email: string,
    private readonly ssn: string,
    private readonly salary: number) {
    super(name, email);
  }

  // ...
}
```

**Tốt:**

```ts
class Employee {
  private taxData: EmployeeTaxData;

  constructor(
    private readonly name: string,
    private readonly email: string) {
  }

  setTaxData(ssn: string, salary: number): Employee {
    this.taxData = new EmployeeTaxData(ssn, salary);
    return this;
  }

  // ...
}

class EmployeeTaxData {
  constructor(
    public readonly ssn: string,
    public readonly salary: number) {
  }

  // ...
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Sử dụng phương thức chuỗi

Đây là một mẫu thiết kế rất tiện dụng và được dùng bởi nhiều thư viện. Nó cho phép code của bạn dễ hiểu hơn, và ngắn gọn hơn. Vì lý do đó, hãy sử dụng phương thức chuỗi và xem code của bạn trông sạch sẽ thế nào.

**Chưa tốt:**

```ts
class QueryBuilder {
  private collection: string;
  private pageNumber: number = 1;
  private itemsPerPage: number = 100;
  private orderByFields: string[] = [];

  from(collection: string): void {
    this.collection = collection;
  }

  page(number: number, itemsPerPage: number = 100): void {
    this.pageNumber = number;
    this.itemsPerPage = itemsPerPage;
  }

  orderBy(...fields: string[]): void {
    this.orderByFields = fields;
  }

  build(): Query {
    // ...
  }
}

// ...

const queryBuilder = new QueryBuilder();
queryBuilder.from('users');
queryBuilder.page(1, 100);
queryBuilder.orderBy('firstName', 'lastName');

const query = queryBuilder.build();
```

**Tốt:**

```ts
class QueryBuilder {
  private collection: string;
  private pageNumber: number = 1;
  private itemsPerPage: number = 100;
  private orderByFields: string[] = [];

  from(collection: string): this {
    this.collection = collection;
    return this;
  }

  page(number: number, itemsPerPage: number = 100): this {
    this.pageNumber = number;
    this.itemsPerPage = itemsPerPage;
    return this;
  }

  orderBy(...fields: string[]): this {
    this.orderByFields = fields;
    return this;
  }

  build(): Query {
    // ...
  }
}

// ...

const query = new QueryBuilder()
  .from('users')
  .page(1, 100)
  .orderBy('firstName', 'lastName')
  .build();
```

**[⬆ Trở lại đầu trang](#mục-lục)**

## SOLID

### Nguyên tắc trách nhiệm duy nhất(SRP)

Như đã nêu trong cuốn Clean Code, "Không nên có nhiều hơn một lý do để một lớp thay đổi". Sẽ thấy vui khi đóng gói một lớp với rất nhiều chức năng, giống như bạn chỉ mang theo một chiếc vali theo chuyến bay của mình. Có một vấn đề với điều này, lớp của bạn sẽ không gắn kết về mặt khái niệm (tên lớp và chức năng), dẫn tới sẽ có nhiều lý do để thay đổi lớp của bạn. Việc giảm thiểu số lần bạn cần thay đổi một lớp là rất quan trọng. Điều này rất quan trọng vì nếu bạn có quá nhiều chức năng trong một lớp và khi bạn sửa đổi một phần của nó, bạn sẽ khó kiểm soát được những ảnh hưởng của thay đổi đến các module phụ thuộc khác trong mã của bạn.

**Chưa tốt:**

```ts
class UserSettings {
  constructor(private readonly user: User) {
  }

  changeSettings(settings: UserSettings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  verifyCredentials() {
    // ...
  }
}
```

**Tốt:**

```ts
class UserAuth {
  constructor(private readonly user: User) {
  }

  verifyCredentials() {
    // ...
  }
}


class UserSettings {
  private readonly auth: UserAuth;

  constructor(private readonly user: User) {
    this.auth = new UserAuth(user);
  }

  changeSettings(settings: UserSettings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Nguyên tắc Mở/Đóng (OCP)

Theo Bertrand Meyer, "các thực thể cấu thành phần mềm(các lớp, các module, các hàm, v.v) nên được thiết kế Mở để có thể mở rộng, nhưng cũng đồng thời Đóng để sửa đổi". Điều đó có nghĩa là gì? Về cơ bản, nguyên tắc này nói rằng bạn nên cho phép người dùng (lập trình viên) thêm mới các chức năng mà không làm thay đổi mã đã tồn tại.

**Chưa tốt:**

```ts
class AjaxAdapter extends Adapter {
  constructor() {
    super();
  }

  // ...
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
  }

  // ...
}

class HttpRequester {
  constructor(private readonly adapter: Adapter) {
  }

  async fetch<T>(url: string): Promise<T> {
    if (this.adapter instanceof AjaxAdapter) {
      const response = await makeAjaxCall<T>(url);
      // biến đổi response và trả lại
    } else if (this.adapter instanceof NodeAdapter) {
      const response = await makeHttpCall<T>(url);
      // biến đổi response và trả lại
    }
  }
}

function makeAjaxCall<T>(url: string): Promise<T> {
  // request and return promise
}

function makeHttpCall<T>(url: string): Promise<T> {
  // request and return promise
}
```

**Tốt:**

```ts
abstract class Adapter {
  abstract async request<T>(url: string): Promise<T>;

  // mã được chia sẻ tới các lớp con...
}

class AjaxAdapter extends Adapter {
  constructor() {
    super();
  }

  async request<T>(url: string): Promise<T>{
    // request and return promise
  }

  // ...
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
  }

  async request<T>(url: string): Promise<T>{
    // request and return promise
  }

  // ...
}

class HttpRequester {
  constructor(private readonly adapter: Adapter) {
  }

  async fetch<T>(url: string): Promise<T> {
    const response = await this.adapter.request<T>(url);
    // transform response and return
  }
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Nguyên tắc thay thế Liskov(LSP)

Đây là một thuật ngữ đáng sợ cho một khái niệm rất đơn giản. Nguyên văn nó được viết là "Nếu S là một kiểu con của T, thì các đối tượng loại T có thể được thay thế bằng các đối tượng loại S (nghĩa là các đối tượng loại S có thể thay thế các đối tượng thuộc loại T) mà không làm thay đổi bất kỳ thuộc tính mong muốn nào của chương trình đó (tính đúng đắn, nhiệm vụ được thực hiện, v.v).". Mô tả đó thậm chí còn đáng sợ hơn.

Giải thích dễ hiểu nhất cho điều nay là, nếu bạn có một lớp cha và một lớp con, thì lớp cha và lớp con có thể được sử dụng thay thế cho nhau mà vẫn nhận được kết quả chính xác. Điều này vẫn có thể gây nhầm lẫn, vì vậy hãy xem xét một ví dụ cổ điển Hình chữ nhật - Hình vuông. Về mặt toán học, hình vuông là một hình chữ nhật, nhưng nếu bạn mô hình hóa Hình vuông bằng mối quan hệ "is-a" (là một) thông qua phép kế thừa, bạn sẽ nhanh chóng nhận ra rắc rối.

**Chưa tốt:**

```ts
class Rectangle {
  constructor(
    protected width: number = 0,
    protected height: number = 0) {

  }

  setColor(color: string): this {
    // ...
  }

  render(area: number) {
    // ...
  }

  setWidth(width: number): this {
    this.width = width;
    return this;
  }

  setHeight(height: number): this {
    this.height = height;
    return this;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width: number): this {
    this.width = width;
    this.height = width;
    return this;
  }

  setHeight(height: number): this {
    this.width = height;
    this.height = height;
    return this;
  }
}

function renderLargeRectangles(rectangles: Rectangle[]) {
  rectangles.forEach((rectangle) => {
    const area = rectangle
      .setWidth(4)
      .setHeight(5)
      .getArea(); // Lỗi: Nếu đối tượng là area là Square, giá trị trả lại sẽ là 25. Kết quả mong muốn là 20
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
```

**Tốt:**

```ts
abstract class Shape {
  setColor(color: string): this {
    // ...
  }

  render(area: number) {
    // ...
  }

  abstract getArea(): number;
}

class Rectangle extends Shape {
  constructor(
    private readonly width = 0,
    private readonly height = 0) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(private readonly length: number) {
    super();
  }

  getArea(): number {
    return this.length * this.length;
  }
}

function renderLargeShapes(shapes: Shape[]) {
  shapes.forEach((shape) => {
    const area = shape.getArea();
    shape.render(area);
  });
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes(shapes);
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Nguyên tắc phân tách giao diện(ISP)

ISP tuyên bố rằng "Các client không nên phục thuộc vào các interface mà chúng không sử dụng.". Nguyên tắc này liên quan rất nhiều tới nguyên tắc Nguyên tắc trách nhiệm duy nhất(SRP).

Thực sự, điều này có nghĩa là bạn luôn thiết kết các bản tóm tắt, giao diện (abstractions, interface) theo cách mà các client đang sử dụng chúng chỉ phải biết về những gì chúng sẽ thực hiện. Điều đó cũng bao gồm việc áp đặt các client chỉ thực hiện các phương thức mà họ thực sự cần.

**Chưa tốt:**

```ts
interface SmartPrinter {
  print();
  fax();
  scan();
}

class AllInOnePrinter implements SmartPrinter {
  print() {
    // ...
  }

  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements SmartPrinter {
  print() {
    // ...
  }

  fax() {
    throw new Error('Fax not supported.');
  }

  scan() {
    throw new Error('Scan not supported.');
  }
}
```

**Tốt:**

```ts
interface Printer {
  print();
}

interface Fax {
  fax();
}

interface Scanner {
  scan();
}

class AllInOnePrinter implements Printer, Fax, Scanner {
  print() {
    // ...
  }

  fax() {
    // ...
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements Printer {
  print() {
    // ...
  }
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Nguyên tắc đảo ngược sự phục thuộc(DIP)

Nguyên tắc này có hai điều thiết yếu:

1. Các module cấp cao không nên phục thuộc vào các module cấp thấp. Cả hai nên phụ thuộc vào lớp trừu tượng.

2. Lớp trừu tượng không nên phục thuộc vào các chi tiết. Các chi tiết nên phục thuộc vào lớp trừu tượng.

Điều này ban đầu có thể khó hiểu, nhưng nếu đã làm việc với Angular, bạn sẽ thấy nguyên tắc này được thực hiện dưới dạng Dependency Injection (DI). Mặc dù chúng không phải là các khái niệm giống hệt nhau, nhưng DIP cũng giữ có các module cấp cao không biết chi tiết của các module cấp thấp và các thiết lập của chúng. Nó có thể thực hiện điều này thông qua DI. Một lợi ích lớn nhất của việc này là nó làm giảm sự ghép nối giữa các module. Khớp nối (phục thuộc) là một mô hình phát triền không tốt vì nó làm cho mã của bạn khó tái cấu trúc.

DIP thường đạt được bằng cách sử dụng bộ chứa điều khiển đảo ngược (inversion of control - IoC). Một ví dụ IoC mạnh mẽ của TypeScript là [InversifyJs](https://www.npmjs.com/package/inversify)

**Chưa tốt:**

```ts
import { readFile as readFileCb } from 'fs';
import { promisify } from 'util';

const readFile = promisify(readFileCb);

type ReportData = {
  // ..
}

class XmlFormatter {
  parse<T>(content: string): T {
    // Chuyển đổi một XML string thành một đối tượng có kiểu T
  }
}

class ReportReader {

  // Chưa tốt: Chúng tạo khởi tạo một phụ thuộc bằng việc thực hiện một yêu cầu cụ thể.
  // Chúng ta chỉ nên có một ReportReader phụ thuộc vào một phương thức phân tích cú pháp: `parse`
  private readonly formatter = new XmlFormatter();

  async read(path: string): Promise<ReportData> {
    const text = await readFile(path, 'UTF8');
    return this.formatter.parse<ReportData>(text);
  }
}

// ...
const reader = new ReportReader();
await report = await reader.read('report.xml');
```

**Good:**

```ts
import { readFile as readFileCb } from 'fs';
import { promisify } from 'util';

const readFile = promisify(readFileCb);

type ReportData = {
  // ..
}

interface Formatter {
  parse<T>(content: string): T;
}

class XmlFormatter implements Formatter {
  parse<T>(content: string): T {
    // Chuyển đổi một XML string thành một đối tượng có kiểu T
  }
}


class JsonFormatter implements Formatter {
  parse<T>(content: string): T {
    // Chuyển đổi một JSON string thành một đối tượng có kiểu T
  }
}

class ReportReader {
  constructor(private readonly formatter: Formatter) {
  }

  async read(path: string): Promise<ReportData> {
    const text = await readFile(path, 'UTF8');
    return this.formatter.parse<ReportData>(text);
  }
}

// ...
const reader = new ReportReader(new XmlFormatter());
await report = await reader.read('report.xml');

// hoặc nếu chúng ta phải đọc một báo cáo từ dạng json
const reader = new ReportReader(new JsonFormatter());
await report = await reader.read('report.json');
```

**[⬆ Trở lại đầu trang](#mục-lục)**

## Kiểm thử

Kiểm thử quan trọng hơn việc gửi code. Nếu bạn không có kiểm thử hoặc không đạt độ phủ (coverage) yêu cầu, thì mỗi lần bạn gửi code, bạn sẽ không thể chắc chắn rằng bạn đã không làm hỏng bất cứ thứ gì.

Quyết định độ phủ là bao nhiêu phụ thuộc vào nhóm làm việc của bạn, nhưng nếu độ phủ yêu cầu là 100% (ở tất các câu lệnh và các đoạn rẽ nhánh) có nghĩa là bạn và những người phát triền cùng sẽ rất an tâm. Điều này có nghĩa, ngoài một khung kiểm thử tốt bạn cũng cần một [công cụ đo độ phủ tốt](https://github.com/gotwarlost/istanbul).

Không có lý do gì để bạn không viết kiếm thử. Có nhiều [công cụ kiểm thử tốt](http://jstherightway.org/#testing-tools) với sự định kiểu hỗ trợ cho TypeScrip, vì vậy hay tìm ra một công cụ kiểm thử mà nhóm bạn ưa thích. Khi bạn là người tìm ra hoặc quyết định công cụ kiểm thử cho nhóm, sau đó hãy luôn hướng tới việc viết kiểm thử cho những tính năng/mô-đun mới mà bạn định phát triển. Nếu phương phát phát triển yêu thích của bạn là TDD (Phát triển hướng kiểm thử), điều đó thật tuyệt vời, nhưng điểm chính là chỉ cần bạn đảm bảo được độ phủ yêu cầu trước khi phát hành bất kỳ tính năng nào hoặc là tái cấu trúc một tính năng hiện có.

### Ba định luật cơ bản của TDD

1. Bạn không được phép viết bất kỳ một logic code nào cho tới khi bạn có một kiểm thử bị fail.

2. Bạn không được phép viết thêm bất kỳ đoạn kiểm thử đơn vị nào mà 1 kiểm thử đang bị lỗi, hay trình biên dịch đang bị lỗi.

3. Bạn không được phép viết thêm bất kỳ một logic code nào mà đoạn mã trước đó đã làm một kiểm thử từ fail chuyển sang pass.

**[⬆ Trở lại đầu trang](#mục-lục)**

### Quy tắc F.I.R.S.T

Kiểm thử tốt tuân theo các quy tắc sau:

- **Nhanh(Fast)** Việc thực thi kiểm thử phải nhanh vì chúng ta muốn chạy chúng thường xuyên.

- **Độc lập(Independent)** Các kiểm thử không nên phụ thuộc lẫn nhau. Chúng nên cho ra cùng một kết quả cho dù chúng được chạy độc lập hay tất cả cùng nhau theo thứ tự bất kỳ.

- **Có thể lặp lại(Repeatable)** Các kiểm thử có thể được lặp lại ở bất kỳ môi trường nào và không có lý do gì làm chúng không đạt(fail).

- **Tự kiểm chứng(Self-Validating)** Một kiểm thử sẽ trả lời bằng *Đạt* hoặc *Không đạt*. Bạn không cần so sánh các tệp nhật ký để trả lời một kiểm thử đã *đạt*.

- **Xảy ra đúng lúc(Timely)** Kiểm thử đơn vị nên được viết trước logic code. Nếu bạn viết kiểm thử sau logic code, bạn có thể sẽ thấy việc viết kiểm thử lúc này là quá khó.

**[⬆ Trở lại đầu trang](#mục-lục)**

### Kiểm thử một điều kiện trên mỗi test

Kiểm thử cũng nên được thiết kế theo nguyên tắc *Trách nhiện duy nhất*. Chỉ kiểm tra một điều kiện trên mỗi kiểm thử đơn vị.

**Chưa tốt:**

```ts
import { assert } from 'chai';

describe('AwesomeDate', () => {
  it('handles date boundaries', () => {
    let date: AwesomeDate;

    date = new AwesomeDate('1/1/2015');
    assert.equal('1/31/2015', date.addDays(30));

    date = new AwesomeDate('2/1/2016');
    assert.equal('2/29/2016', date.addDays(28));

    date = new AwesomeDate('2/1/2015');
    assert.equal('3/1/2015', date.addDays(28));
  });
});
```

**Tốt:**

```ts
import { assert } from 'chai';

describe('AwesomeDate', () => {
  it('handles 30-day months', () => {
    const date = new AwesomeDate('1/1/2015');
    assert.equal('1/31/2015', date.addDays(30));
  });

  it('handles leap year', () => {
    const date = new AwesomeDate('2/1/2016');
    assert.equal('2/29/2016', date.addDays(28));
  });

  it('handles non-leap year', () => {
    const date = new AwesomeDate('2/1/2015');
    assert.equal('3/1/2015', date.addDays(28));
  });
});
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tên của kiểm thử nên thể hiện được ý định của nó

Khi một kiểm thử báo lỗi, tên của nó là dấu hiện đầu tiên cho biết vấn đề đang gặp là gì.

**Chưa tốt:**

```ts
describe('Calendar', () => {
  it('2/29/2020', () => {
    // ...
  });

  it('throws', () => {
    // ...
  });
});
```

**Tốt:**

```ts
describe('Calendar', () => {
  it('should handle leap year', () => {
    // ...
  });

  it('should throw when format is invalid', () => {
    // ...
  });
});
```

**[⬆ Trở lại đầu trang](#mục-lục)**

## Xử lý bất động bộ

### Ưu tiên Promise hơn Callback

Callback không rõ ràng, và chúng gây ra các đoạn mã lồng nhau quá nhiều - *(Địa ngục callback - The callback hell)*.

Có nhiều tiện ích giúp cho việc chuyển đổi các hàm đang sử dụng phong cách callback thành các hàm trả về promise(với Node.js chúng ta có [`util.promisify`](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original), dùng chung cho JavaScript chúng ta có [pify](https://www.npmjs.com/package/pify), [es6-promisify](https://www.npmjs.com/package/es6-promisify))

**Chưa tốt:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';

function downloadPage(url: string, saveTo: string, callback: (error: Error, content?: string) => void) {
  get(url, (error, response) => {
    if (error) {
      callback(error);
    } else {
      writeFile(saveTo, response.body, (error) => {
        if (error) {
          callback(error);
        } else {
          callback(null, response.body);
        }
      });
    }
  });
}

downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html', (error, content) => {
  if (error) {
    console.error(error);
  } else {
    console.log(content);
  }
});
```

**Tốt:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = promisify(writeFile);

function downloadPage(url: string, saveTo: string): Promise<string> {
  return get(url)
    .then(response => write(saveTo, response));
}

downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html')
  .then(content => console.log(content))
  .catch(error => console.error(error));
```

Promise hỗ trợ một vài phương thức giúp các đoạn mã ngắn gọn hơn:

| Phương thức              | Mô tả                                      |
| ------------------------ | -----------------------------------------  |
| `Promise.resolve(value)` | Chuyển đổi một giá trị thành một resolved promise.   |
| `Promise.reject(error)`  | Chuyển đổi một giá trị thành một rejected promise.   |
| `Promise.all(promises)`  | Trả về một promise mới, thực hiện "đồng loạt" các `promises` được truyền vào. Giá trị của promise mới là mảng các giá trị của các `promises` hoặc sẽ nhận giá trị rejected là giá trị của promise đầu tiên trả về rejected.  |
| `Promise.race(promises)`| Trả về một promise mới, với kết quả/lỗi là kết quả/lỗi của promise trong mảng `promises` trả về đầu tiên(sớm nhất). |

`Promise.all` Đặc biệt hữu ích khi muốn các tác vụ được chạy song song.
 `Promise.race` Giúp tạo ra các giới hạn thời gian thực thi cho các promise một cách dễ dàng.

**[⬆ Trở lại đầu trang](#mục-lục)**

### Async/Await thậm chí còn tốt hơn Promises

Với cú pháp `async`/`await` bạn có thể viết mã sạch hơn và dễ hiểu hơn nhiều so với sử dụng chuỗi promise. Trong một hàm, mà hàm đó có tiền tố `async`, bạn có thể hiểu rằng JavaScript sẽ "dừng" thực thi các đoạn mã cho tới khi các đoạn mã có từ khóa `await` được thực thi(sử dụng với hàm trả về một promise).

**Chưa tốt:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = util.promisify(writeFile);

function downloadPage(url: string, saveTo: string): Promise<string> {
  return get(url).then(response => write(saveTo, response));
}

downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html')
  .then(content => console.log(content))
  .catch(error => console.error(error));
```

**Tốt:**

```ts
import { get } from 'request';
import { writeFile } from 'fs';
import { promisify } from 'util';

const write = promisify(writeFile);

async function downloadPage(url: string, saveTo: string): Promise<string> {
  const response = await get(url);
  await write(saveTo, response);
  return response;
}

// đâu đó trong một hàm có tiền tố async
try {
  const content = await downloadPage('https://en.wikipedia.org/wiki/Robert_Cecil_Martin', 'article.html');
  console.log(content);
} catch (error) {
  console.error(error);
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

## Xử lý lỗi

Ném ra các lỗi là một ý tưởng tốt. Điều đó có nghĩa chương trình của bạn sẽ phát hiện được khi có lỗi gì đó xảy ra với chương trình và chương trình sẽ được dừng lại ngay tại ngăn xếp hiện tại của nó, tiến trình sẽ bị hủy (trong Node), và nó sẽ thông báo cho bạn ở cửa sổ dòng lệnh với thông tin của ngăn xếp.

### Luôn sử dụng kiểu Error khi muốn thể hiện một lỗi

JavaScript cũng như TypeScript cho phép bạn `throw` mọi đối tượng. Một Promise cũng có thể trả về thất bại (rejected) với mọi đối tượng là lý do thất bại.

Nên sử dụng cú pháp `throw` với kiểu là `Error`. Nên làm như vậy bởi vì, các lỗi của bạn có thể được bắt bằng cú pháp `catch` ở những đoạn code có level cao hơn.
Nó sẽ là rất khó hiểu cho bạn nếu bạn chỉ bắt được một chuỗi ở đó và nó gây ra [Việc khó khăn khi gỡ lỗi](https://basarat.gitbook.io/typescript/type-system/exceptions#always-use-error).

Vì lý do tương tự, khi muốn thông báo một Promise bị thất bại, bạn nên dùng kiểu `Error`.

**Chưa tốt:**

```ts
function calculateTotal(items: Item[]): number {
  throw 'Not implemented.';
}

function get(): Promise<Item[]> {
  return Promise.reject('Not implemented.');
}
```

**Tốt:**

```ts
function calculateTotal(items: Item[]): number {
  throw new Error('Not implemented.');
}

function get(): Promise<Item[]> {
  return Promise.reject(new Error('Not implemented.'));
}

// or equivalent to:

async function get(): Promise<Item[]> {
  throw new Error('Not implemented.');
}
```

Lợi ích của việc sử dụng kiểu `Error` (và các mở rộng của nó) là nó được hỗ trợ bởi cú pháp `try/catch/finally` và đặc biệt tất cả các lỗi sẽ có thuộc tính `stack`, đó là thứ sẽ giúp ích rất nhiều khi bạn gỡ lỗi chương trình.
Ngoài ra có một cách khác giúp không sử dụng cú pháp `throw` - Luôn trả về các đối tượng thể hiện lỗi có tùy chỉnh. TypeScript còn làm điều này dễ dàng hơn.
Xem xét ví dụ sau:

```ts
type Result<R> = { isError: false, value: R };
type Failure<E> = { isError: true, error: E };
type Failable<R, E> = Result<R> | Failure<E>;

function calculateTotal(items: Item[]): Failable<number, 'empty'> {
  if (items.length === 0) {
    return { isError: true, error: 'empty' };
  }

  // ...
  return { isError: false, value: 42 };
}
```

[Bài viết](https://medium.com/@dhruvrajvanshi/making-exceptions-type-safe-in-typescript-c4d200ee78e9) này giải thích chi tiết về ý tưởng trên, hãy tham khảo.

**[⬆ Trở lại đầu trang](#mục-lục)**

### Đừng bỏ qua các lỗi bắt được

Không làm gì với những lỗi có thể bắt được không giúp ích gì cho việc sửa lỗi hoặc có những hành động tương ứng với những lỗi đó. Việc bạn thể hiện lỗi bằng `console.log` sẽ không tốt hơn việc không làm gì, nó có thể bị lẫn trong một biển các thứ được in ra ở cửa sổ lệnh.
Nếu bạn đặt đoạn mã của mình trong một đoạn `try/catch`, điều đó có nghĩa là bạn phải chuẩn bị cho việc một lỗi sẽ xảy ra ở đó và bạn phải có kế hoạch cho việc đó.

**Chưa tốt:**

```ts
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}

// hoặc thậm chí tệ hơn

try {
  functionThatMightThrow();
} catch (error) {
  // bỏ qua lỗi
}
```

**Tốt:**

```ts
import { logger } from './logging'

try {
  functionThatMightThrow();
} catch (error) {
  logger.log(error);
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Đừng bỏ trường hợp Promise bị lỗi

Lý do tương tự như phần trên, bạn không nên bỏ qua việc bắt các lỗi của Promise bằng `try/catch`.

**Chưa tốt:**

```ts
getUser()
  .then((user: User) => {
    return sendEmail(user.email, 'Welcome!');
  })
  .catch((error) => {
    console.log(error);
  });
```

**Good:**

```ts
import { logger } from './logging'

getUser()
  .then((user: User) => {
    return sendEmail(user.email, 'Welcome!');
  })
  .catch((error) => {
    logger.log(error);
  });

// hoặc sử dụng cú phát `async/await`:

try {
  const user = await getUser();
  await sendEmail(user.email, 'Welcome!');
} catch (error) {
  logger.log(error);
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

## Định dạng

Định dạng là một vấn đề chủ quan. Giống như nhiều quy tắc trong tài liêu này, không có quy tắc cứng nhắc hay bền vững nào mà bạn phải tuân theo. Điểm mấu chốt là *Không tranh luận(ARGUE)* khi xem xét các định dạng. Có rất nhiều công cụ để tự động hóa việc kiểm tra định dạng. Hãy chọn một công cụ cho dự án của bạn! Thật lãng phí thời gian và tiền bạc để các kỹ sư tranh luận về định dạng. Quy tắc chung phải tuân theo là *giữ cho các quy tắc định dạng nhất quán*.

Với TypeScript chúng ta có một công cụ rất mạnh cho việc này - [TSLint](https://palantir.github.io/tslint/). Đây là một công cụ phân tích tĩnh, nó có thể giúp bạn cải thiện đáng kể chất lượng mã của bạn. Nếu bạn đã cài đặt TSLint, thì đây là một số cấu hình có sẵn bạn có thể tham khảo cho các dự án của mình:

- [TSLint Config Standard](https://www.npmjs.com/package/tslint-config-standard) - Những định dạng tiêu chuẩn

- [TSLint Config Airbnb](https://www.npmjs.com/package/tslint-config-airbnb) - Quy tắc của Airbnb

- [TSLint Clean Code](https://www.npmjs.com/package/tslint-clean-code) - Những nguyên tắc được lấy cảm hứng từ [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.ca/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)

- [TSLint react](https://www.npmjs.com/package/tslint-react) - Các quy tắc liên quan tới React & JSX

- [TSLint + Prettier](https://www.npmjs.com/package/tslint-config-prettier) - Quy tắc cho công cụ [Prettier](https://github.com/prettier/prettier) định dạng mã

- [ESLint rules for TSLint](https://www.npmjs.com/package/tslint-eslint-rules) - Quy tắc của ESLint dành cho TypeScript

- [Immutable](https://www.npmjs.com/package/tslint-immutable) - Quy tắc để vô hiệu hóa các đột biên (mutation) trong TypeScript

Một nguồn tham khảo tuyệt vời [TypeScript StyleGuide and Coding Conventions](https://basarat.gitbook.io/typescript/styleguide).

### Nhất quán khi sử dụng viết hoa

Việc viết hoa cho bạn biết rất nhiều về các biến , hàm...của bạn. Những quy tắc này mang tính chủ quan, nhóm của bạn có thể tùy chọn nó. Vấn đề là, bất kể bạn chọn gì, chỉ cần *nhất quán*.

**Chưa tốt:**

```ts
const DAYS_IN_WEEK = 7;
const daysInMonth = 30;

const songs = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const Artists = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function restore_database() {}

type animal = { /* ... */ }
type Container = { /* ... */ }
```

**Good:**

```ts
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;

const SONGS = ['Back In Black', 'Stairway to Heaven', 'Hey Jude'];
const ARTISTS = ['ACDC', 'Led Zeppelin', 'The Beatles'];

function eraseDatabase() {}
function restoreDatabase() {}

type Animal = { /* ... */ }
type Container = { /* ... */ }
```

Ưu tiên sử dụng `PascalCase` cho tên lớp, interface, kiểu và tên của các không gian tên(namespace).

Ưu tiên sử dụng `camelCase` cho các tên biến, hàm, các thuộc tính của lớp.

**[⬆ Trở lại đầu trang](#mục-lục)**

### Các hàm gọi và các hàm được gọi nên để cạnh nhau

Nếu một hàm họi một hàm khác, nên giữ các hàm đó gần nhau theo chiều dọc trong trong tệp mã.
Lý tưởng nhất là giữ hàm gọi ở ngay trên hàm được gọi.
Chúng ta có xu hướng đọc mã từ trên xuống, như khi đọc báo. Vì lý do đó, điều này sẽ giúp mã của bạn sẽ được đọc theo cách đó.

**Chưa tốt:**

```ts
class PerformanceReview {
  constructor(private readonly employee: Employee) {
  }

  private lookupPeers() {
    return db.lookup(this.employee.id, 'peers');
  }

  private lookupManager() {
    return db.lookup(this.employee, 'manager');
  }

  private getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  review() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();

    // ...
  }

  private getManagerReview() {
    const manager = this.lookupManager();
  }

  private getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.review();
```

**Tốt:**

```ts
class PerformanceReview {
  constructor(private readonly employee: Employee) {
  }

  review() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();

    // ...
  }

  private getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  private lookupPeers() {
    return db.lookup(this.employee.id, 'peers');
  }

  private getManagerReview() {
    const manager = this.lookupManager();
  }

  private lookupManager() {
    return db.lookup(this.employee, 'manager');
  }

  private getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.review();
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tổ chức phần `import`

Với các đoạn import rõ ràng và dễ đọc, bạn có thể nhanh chóng biết được các gói thư viện mà đoạn mã đang sử dụng. Hãy chắc chắn bạn áp dụng đúng các nguyên tắc tốt nhất cho câu lệnh `import`:

- Các câu lệnh `import` nên được sắp xếp theo thứ tự abc và được gom theo nhóm.
- Những `import` không được sử dụng nên bị xóa bỏ.
- Tên của những thành phần được `import` nên sắp xếp theo thứ tự abc (ví dụ: `import {A, B, C} from 'foo';`)
- Nên sắp xếp theo thứ tự acb với tên của các gói thư việc được `import`, ví dụ: `import * as foo from 'a'; import * as bar from 'b';`
- Các nhóm `import` nên được phân cách bằng các dòng trống.
- Các nhóm được phân chia theo thứ tự sau:
  - `Polyfills` (ví dụ: `import 'reflect-metadata';`)
  - Các mô đun Node (ví dụ: `import fs from 'fs';`)
  - Các mô đun mở rộng (ví dụ: `import { query } from 'itiriri';`)
  - Các mô đun nội bộ (ví dụ: `import { UserService } from 'src/services/userService';`)
  - Các mô đun từ một thư mục cha (ví dụ: `import foo from '../foo'; import qux from '../../foo/qux';`)
  - Các mô đun từ các thư mục cùng cấp hoặc ở cấp thấp hơn (ví dụ: `import bar from './bar'; import baz from './bar/baz';`)

**Chưa tốt:**

```ts
import { TypeDefinition } from '../types/typeDefinition';
import { AttributeTypes } from '../model/attribute';
import { ApiCredentials, Adapters } from './common/api/authorization';
import fs from 'fs';
import { ConfigPlugin } from './plugins/config/configPlugin';
import { BindingScopeEnum, Container } from 'inversify';
import 'reflect-metadata';
```

**Tốt:**

```ts
import 'reflect-metadata';

import fs from 'fs';
import { BindingScopeEnum, Container } from 'inversify';

import { AttributeTypes } from '../model/attribute';
import { TypeDefinition } from '../types/typeDefinition';

import { ApiCredentials, Adapters } from './common/api/authorization';
import { ConfigPlugin } from './plugins/config/configPlugin';
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Sử dụng tính năng aliases của TypeScript

Tạo ra các đoạn `import` đẹp hơn bằng cách định nghĩa các thuộc tính `paths` và `baseUrl` trong phần `compilerOptions` của file `tsconfig.json`.

Điều này sẽ tránh được việc phải dùng các đường dẫn tương đối quá dài khi thực hiện `import`.

**Chưa tốt:**

```ts
import { UserService } from '../../../services/UserService';
```

**Tốt:**

```ts
import { UserService } from '@services/UserService';
```

```js
// tsconfig.json
...
  "compilerOptions": {
    ...
    "baseUrl": "src",
    "paths": {
      "@services": ["services/*"]
    }
    ...
  }
...
```

**[⬆ Trở lại đầu trang](#mục-lục)**

## Chú thích

Việc sử dụng các dòng chú thích là một dấu hiệu của sự thất bại của việc thể hiện ý nghĩa của các dòng mã. Các đoạn mã phải là nơi duy nhất cung cấp sự thật.

> Don’t comment bad code—rewrite it.
> — *Brian W. Kernighan and P. J. Plaugher*

> Dịch: Đừng cố giải thích những dòng mã chưa tốt, hãy viết lại chúng.

### Ưu tiên việc các đoạn mã tự giải thích chính nó thay vì sử dụng các chú thích

Các đoạn chú thích như một thứ tồi tệ, không phải một thủ tục. Các đoạn mã tốt *hầu hết* tự viết tài liệu cho chính nó.

**Chưa tốt:**

```ts
// Check if subscription is active.
if (subscription.endDate > Date.now()) {  }
```

**Tốt:**

```ts
const isSubscriptionActive = subscription.endDate > Date.now();
if (isSubscriptionActive) { /* ... */ }
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Đừng để lại những đoạn mã đã bị bỏ đi trong những chú thích

`Version control` tồn tại có lý do của nó. Để lại nhưng đoạn mã cũ ở trong lịch sử của nó.

**Chưa tốt:**

```ts
type User = {
  name: string;
  email: string;
  // age: number;
  // jobPosition: string;
}
```

**Tốt:**

```ts
type User = {
  name: string;
  email: string;
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Đừng để lại những chú thích dạng nhật ký

Hãy nhớ sử dụng `version control`! Không cần những đoạn mã đã bị bỏ đi, những mã đã bị cho vào chú thích, và đặc biệt là những chú thích dạng nhật ký. Hãy sử dụng lệnh `git log` để xem lại lịch sử!

**Chưa tốt:**

```ts
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Added type-checking (LI)
 * 2015-03-14: Implemented combine (JR)
 */
function combine(a: number, b: number): number {
  return a + b;
}
```

**Tốt:**

```ts
function combine(a: number, b: number): number {
  return a + b;
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Tránh đánh dấu vị trí

Chúng thường chỉ thêm các phiền phức. Hãy để các hàm và các biến thụt lề theo đúng định dạng của chúng, từ đó chúng sẽ cung cấp cấu trúc trực quan cho mã của bạn.

Hầu hết các IDE hỗ trợ tính năng "thu gấp" (folding) các đoạn mã, cho phép bạn thu gọn / mở rộng các khỗi mã (tham khảo Visual Studio Code [folding regions](https://code.visualstudio.com/updates/v1_17#_folding-regions)).

**Chưa tốt:**

```ts
////////////////////////////////////////////////////////////////////////////////
// Client class
////////////////////////////////////////////////////////////////////////////////
class Client {
  id: number;
  name: string;
  address: Address;
  contact: Contact;

  ////////////////////////////////////////////////////////////////////////////////
  // public methods
  ////////////////////////////////////////////////////////////////////////////////
  public describe(): string {
    // ...
  }

  ////////////////////////////////////////////////////////////////////////////////
  // private methods
  ////////////////////////////////////////////////////////////////////////////////
  private describeAddress(): string {
    // ...
  }

  private describeContact(): string {
    // ...
  }
};
```

**Tốt:**

```ts
class Client {
  id: number;
  name: string;
  address: Address;
  contact: Contact;

  public describe(): string {
    // ...
  }

  private describeAddress(): string {
    // ...
  }

  private describeContact(): string {
    // ...
  }
};
```

**[⬆ Trở lại đầu trang](#mục-lục)**

### Chú thích TODO

Khi bạn thấy cần để lại những ghi chú trong mã cho một số cải tiến, chỉnh sửa sau này, hãy làm điều đó bằng cách sử dụng chú thích kiểu `// TODO`. Hầu hết các IDE đều hỗ trợ cho kiểu chú thích đó, bạn có thể nhanh chóng liệt kê toàn bộ các `todo`.

Tuy nhiên, hãy nhớ chú thích kiểu *TODO* không phải là lý do để các đoạn mã xấu tồn tại.

**Chưa tốt:**

```ts
function getActiveSubscriptions(): Promise<Subscription[]> {
  // ensure `dueDate` is indexed.
  return db.subscriptions.find({ dueDate: { $lte: new Date() } });
}
```

**Tốt:**

```ts
function getActiveSubscriptions(): Promise<Subscription[]> {
  // TODO: ensure `dueDate` is indexed.
  return db.subscriptions.find({ dueDate: { $lte: new Date() } });
}
```

**[⬆ Trở lại đầu trang](#mục-lục)**

## Các ngôn ngữ khác

Tài liệu nãy cũng có sẵn trong các ngôn ngữ khác:

- ![br](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Tiếng Bồ Đào Nha của người Brazi**: [vitorfreitas/clean-code-typescript](https://github.com/vitorfreitas/clean-code-typescript)
- ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Tiếng Trung**:
  - [beginor/clean-code-typescript](https://github.com/beginor/clean-code-typescript)
  - [pipiliang/clean-code-typescript](https://github.com/pipiliang/clean-code-typescript)
- ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Tiếng Nhật**: [MSakamaki/clean-code-typescript](https://github.com/MSakamaki/clean-code-typescript)
- ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Tiếng Nga**: [Real001/clean-code-typescript](https://github.com/Real001/clean-code-typescript)
- ![tr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Turkey.png) **Tiếng Thổ Nhĩ Kỳ**: [ozanhonamlioglu/clean-code-typescript](https://github.com/ozanhonamlioglu/clean-code-typescript)

Những ngôn ngữ đang trong quá trình dịch:

- ![kr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) Tiếng Hàn
