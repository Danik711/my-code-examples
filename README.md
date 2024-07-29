Автор: Даниил Клишин
Версия докемента: 1.0
Дата обновления: 29.07.2024

Привет, React-Native разработчик! В этом документы ты найдёшь некоторые готовые решения, которые используются в приложениях и некоторые FAQ.

# Вопросы по Git

В компании используется GitLab. CTO создаст проект и туда нужно будет пригласить тим-лида.

Потом разработчик создаст пустой react-native проект. Желательно сразу добавить все упаковки, типичные стили, шрифты и т.д. Это сохранит время, потому что нужно будет ответлятся от главной ветки, когда будет новая задача.

Если разработчик работает над новой функцией то название ветки будет:

> feature/NameOfBranch

Если это исправление ошибок:

> fix/NameOfBranch

После того как задача закончена, разработчик создаст merge request в **develop**. Тим-лид будет проводить code review. Разроботчики, старайтесь, чтобы не было очень много изменений в ветке. Не добавляейте иные задания в свою ветку. Для каждого задания должна быть своя ветка. Сохраните своё время и тим-лида.

Комментарии от тим-лида указывают на улудшения или ошибки. Если разработчик не согласен, это можно обсудить в комментариях, или если тим-лид не против, то в личных соообщениях. Давайте грамотные доводы, если вы не согласны. Работа тим-лида - это научить (помочь), а не спорить.

**develop** это ветка где находится последняя версия кода.

Когда проект закончили, разработчик создаст merge request, чтобы перенести код с develop в main для передачи проекта клиенту.

# Ожидания написания кода в React-Native

## Иерархия папок в проекте

В проекте должна быть папка **src**, где будут находится все react компоненты. Остальные папки для картинок, иконок или иных вспомогающих ts функций - на усмотрение разработчика. Главное, чтобы было понятно тим-лиду и иным разработчикам (понятные названия, которые говорят за что отвечает папка).

Пример из одного проекта:

```
...
assets/
   fonts/
   icons/
   images/
   some_file.ts
   ...
helpers/
    files_with_ts_funtions.ts
    ...
src/
    back-end/
        ...
    components/
        blocks/
            ...
        models/
            ...
        ui/
            ...
        ...
    navigation/
        ...
    pages/
        auth/
        bottom-tab/
        ...
    redux/
        ...
...
```

## Язык написания кода

С версии react-native 0.71 проекты пишутся только на TypeScript. Поэтому ожидаемый язык написание - это **TypeScript**.

## Компоненты

React-Native проекты пишутся через **functional components**, это и рекомендуют сами разработчики react-native.

```typescript
export default function MyComponent() {}
```

**class components** редко используются. Их можно использывать если нужно создать **ref** объект для вызыва компонета для выполния каких-либо задач в разных местах приложения. Разработчик сам должен решить, когда создавать **class component**.

```typescript
export default class MyClass {}
```

## Комментарии

Разработчик обязательно должен писать коментарии к коду. Могут быть задачи, где придётся написать большую пользовательскую функцию, и там будет много своебразных переменных. Нужно, чтобы разработчик описал за что отвечает каждая переменная. Это и касается параметров функций, когда их прилично много. Помогайте делать код читаемым для будующих разработчиков проекта. Понятно, что имя может сказать за что отвечает переменная, но это не всегда так.

Пример комментариев:

```typescript
const GRAHP_MIN_VALUE = 1;
const GRAPH_MAX_VALUE = 500;
const GRAPH_BARS_SPACING = 30;
const WIDTH_OF_GRAPH_BAR = wp("12%");
const { timesheetId, timesheet, arrayIndex } = route.params;

// says if all days are confirmed in a timesheet
const areAllDaysConfirmed = useRef<boolean>(false);

// Array that holds data related to workers' days during the vacancy
const [workersDays, setWorkersDays] = useState<TimesheetWorkersDay[]>([]);

// Holds data that populates the graph. Data is populated in parseDataForGraph
const [grahpData, setGraphData] = useState<barDataItem[]>([]);

// Says which month is focused on a graph
const [graphMonthFocusIndex, setGraphMonthFocusIndex] = useState({
  monthIndex: "01",
  index: 0,
  numberDays: 0,
  arrayIndex: 0,
});

// Holds months that are present on a graph
const [grahpMonths, setGraphMonths] = useState<
  {
    monthIndex: string;
    index: number;
    numberDays: number;
    arrayIndex: number;
  }[]
>([]);

// show confirm report card model
const [showConfirmReportCardModel, setShowConfirmReportCardModel] =
  useState(false);

// show confirm report table model
const [showConfirmReportTableModel, setShowConfirmReportTableModel] =
  useState(false);

function calculateWorkersData(allDaysInTable: TimeSheetDay[]) {
  // Total amount of seconds workers have spent during
  // vacancy lifetime
  let totalSeconds = 0;

  // Number of all employees in the timesheet that finished their work
  // They have start_time and end_time defined
  let employee_count = 0;

  // Number of unique employees that have start_time and end_time defined
  let unique_employee_count = 0;

  // Array holds workers' ids that we have seen already
  const unique_ids: number[] = [];

  // temp array that holds stats about worker activity
  const workersDay: TimesheetWorkersDay[] = [];

  // A day that has at least one worker finished a job
  let dayWithFinihsedWorker = 0;

  // The rest of the code below
  // ...
}
```

Пишити комментарии на английском или русском языках.

## Написания кода в родной среде телефона (Нативная среда)

Разработчики, старайтесь избегать написания кода в родной среде (Kotlin и ObjC). Обычно, проекты на небольшой срок, и ошибки в родной среде могут вызвать проблемы, который сложно исправлять. В 99.9% уже есть решение (npm упаковка), где всё написано и проверено. Лучше провести время на поиски упаковки, чем поратить на исправления багов на языках, которые не так хорошо знаешь. Если разработчик очень хорошо знает Java/Objc (Kotlin/Swift), зачем выбирать тогда react-native :grin:?

А в свободное от работы время тестируйте в своё удовольствие, может это ты кто напишет классную упаковку для react-native с 1М+ скачиваний :sunglasses:.

# Рекомендуемые Упаковки для проектов

Лист упаковок может обновлятся. Так же разработчики могут рекомендовать упаковки, чтобы добавить сюда.

1. [react-navigation](https://reactnavigation.org/) - Самая типичная упаковка для навигации в приложении
2. [reduxjs/toolkit](https://redux-toolkit.js.org/) - упаковка для работы с временной помятью для передачи данных в любое место приложения
3. [axios](https://www.npmjs.com/package/axios) - упаковка для вызова APIs в приложении
4. [react-native-blob-util](https://www.npmjs.com/package/react-native-blob-util) - упаковка для скачивания файлов онлайн и сохранения в памяти телефона
5. Для работы с камерой где нужно вызвать камеру прям в приложении есть два выбора. Может быть есть ещё.

   - [react-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera) - пока не работает на RN 0.74^ (проверяйте сами). Тут много функционала для работы с камерой: сканнеры, qr bar коды сканнеры и т.д.
   - [react-native-camera](https://github.com/react-native-camera/react-native-camera?tab=readme-ov-file) - упаковка всё так-же хорошо работает.

6. [react-native-qrcode-scanner](https://www.npmjs.com/package/react-native-qrcode-scanner) - упаковка для сканирования qr кодов. Нужна react-native-camera как зависимость
7. [react-native-config](https://www.npmjs.com/package/react-native-config) - для создания .env фалый в приложении. Полезный [туториал](https://medium.com/@sathishkcontact/managing-multiple-environments-in-react-native-android-ios-scripts-for-different-builds-ea4c5bff6782). Он сделан для JavaScript, поэтому обязательно пройдитесть по ссылке упаковки, чтобы добавить файл для TypeScript.
8. [react-native-encrypted-storage](https://www.npmjs.com/package/react-native-encrypted-storage) - упаковка для зашифрованного хранения данных.
9. [react-native-fast-image](https://www.npmjs.com/package/react-native-fast-image) - упаковка для работы с картинками для скачивания онлайн.
10. [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) - настоятельно рекомендую. Классная упаковка для работы с анимациями через родную среду. Легка в использовании с версии 3.0^
11. [react-native-svg](https://www.npmjs.com/package/react-native-svg) - для работы с SVG в react-native. Так же [сайт](https://react-svgr.com/playground/?native=true&typescript=true), который генерирует код react компонента, который просто можно показать в приложении.
12. [moment](https://momentjs.com/) - упаковка для работы с датами.
13. [geolib](https://www.npmjs.com/package/geolib) - упаковка для работы с координатами. Дистанция от точки до точки и т.д.
14. [fuzzysort](https://npmjs.com/package/fuzzysort) - прекрасная упаковка для поиска данных в больших массивах. Ищет данные по имени поля в объектах.
15. [react-native-keyboard-aware-scroll-view](https://www.npmjs.com/package/react-native-keyboard-aware-scroll-view) - очень классная упаковка которая даёт листать экран, когда клавиатура закрывает экран.
16. [react-native-biometrics](https://www.npmjs.com/package/react-native-biometrics) - упаковка даёт возможность работать с touchid(все платформы) и faceId(только айфоны).
17. [react-native-responsive-screen](https://www.npmjs.com/package/react-native-responsive-screen) - упаковка помогает делать интрефейс для разных размеров экранов. Её функции возвращают размеры в пикселях, принимая процент от размера экрана в параметрах. Поэтому лучше не использовать для View который внутри другого View.

# Всякие готовые решения
- [Some Redux (TSX)](https://github.com/Danik711/my-code-examples/tree/main/some-redux)

  Файл показывает как можно сократить код в redux и не добавлять множество type checks, которые могут вызвать некоторые проблемы. 

- [Axios Exmaple (TSX)](https://github.com/Danik711/my-code-examples/tree/main/axios-example)

  Переходи по ссылке, чтобы получить файлы. Ниже это просто пример. Файл который используется для создания копии axios и пример использования API calls в приложениях. В папке есть файл который используетс для вызова API call. Он использует redux упаковку. Это рекомендуемый способ вызывов API calls  в React-Native прилодениях. На страницах где нужно вызвать API нужно есрользывать redux hooks APIs для взаимодействия с ними.

  ```typescript
  import { userRegisterApi } from "path_to_thunk_function";
  import { useAppDispatch, useAppSelector } from "path_to_store";

  export default function SomeComponent() {
    const dispatch = useAppDispatch();
    
    function registerUser() {
      try {
        const res = await dispatch(
            userRegisterApi(userObjApi)
        )
        .unwrap();

        // Api is successful, parse the result

      } catch (error: any) {
        // Parse Error
      }
    }

    return (
      ...
    );
  } 
  ``` 

- [Bottom Slide Menu (TSX)](https://github.com/Danik711/my-code-examples/tree/main/bottom-slide-menu)

  Это всплывающее окно снизу которое отображает практически любые данные. Компонент принимает JSX в качестве
  children. Вы можете менять код у себя под свои нужды. **Обязательно проверьте зависимости!**

  Вызывайте функции **open** и **close** как вам удобно. Пример использывания:
  ```typescript
  import BottomSlidingMenu from "path_to_file/bottom-sliding-menu";

  export default function SomeComponent() {
    const bottomSlidingMenuRef = useRef<BottomSlidingMenu>(null);

    function open() {
      bottomSlidingMenuRef.current?.showBottomMenu();
    }

    function close() {
      bottomSlidingMenuRef.current?.hideBottomMenu();
    }

    return (
      <BottomSlidingMenu
          ref={bottomSlidingMenuRef}
          title={textsInApp["ru"].selectCity}
      >
          {
              // Some UI
          }
      </BottomSlidingMenu>
    );
  }
  ```
![Пример Меню](https://github.com/Danik711/my-code-examples/blob/main/bottom-slide-menu/bottom-sliding-menu.gif)