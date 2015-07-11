# MyDirectives

Some Angular Directives

---

deleteConfirm.js

点击**删除**按钮，显示**取消**与**确认删除**按钮

使用方式：

    <delete-confirm delete-fn="remove" delete-key="$index"></delete-confirm>

`delete-fn`传具体删除方法，`delete-key`传参数

---

jqDatepicker.js

日期选择

采用jquery datepicker，使用方式：

    <input type="text" jqdatepicker ng-model="XXXXXX" placeholder="YYYYMMDD" readonly="readonly">

日期区间选择器：

    <jqdatepicker-range range-id="'id'" ng-model="XXXXXX"></jqdatepicker-range>

使用点：range-id传入一个id前缀，如果一个页面使用两次该组件，需要写入不同的range-id

ng-model为要绑定的属性，选中日期后将赋值为：`YYYYMMDD~YYYYMMDD`

---

singleCheckbox.js

单选checkbox

使用方式：

    <div single-checkbox>
        <input type="checkbox" name="compo" id="aaa">
        <label for="aaa">AAA</label>
        <input type="checkbox" name="compo" id="bbb">
        <label for="bbb">BBB</label>
    </div>
