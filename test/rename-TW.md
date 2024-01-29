If the new tutorial step name is TW1.2.3

- change the unit test `describe()` string to `TW1.2.3 some description`. This is the most important as it will reorder the test page. But that's not all!...
- rename in Canvas tutorial page(s)
- rename in Canvas lecture module (tutorial step numbers are included in the page titles)
- git mv the old vue interactive test to `tw/tw1.2.3.jsx`, change the static text like `This is the TW1.2.3 inteactive text, you can edit the file tw1.2.3.jsx` 
- git mv the old react interactive test (if any) to `tw/tw1.2.3-react.jsx` , change the content to `import tw1.2.3.jsx`
- change the links from the unit test to the new interactive tests! `tw/tw1.2.3.html`  and `tw/tw1.2.3-react.html`
- search-replace the unit test function names to tw_1_2_3_someFunc
- git mv the unit test file to `test/tw1.2.3-someUnit.test.js`