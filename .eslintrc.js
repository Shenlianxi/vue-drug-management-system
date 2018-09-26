// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  parserOptions: {
    sourceType: 'module'
},
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  'settings': {
    'import/resolver': {
        'webpack': {
            'config': 'build/webpack.base.conf.js'
        }
    }
},
  // add your custom rules here
  rules: {
    'accessor-pairs': 2,//在对象中使用getter/setter
    'arrow-spacing': [2, { 'before': true, 'after': true }],//=>的前/后括号
    'block-spacing': [2, 'always'],//在单行代码块中，代码块前后是否需要留空格
    'brace-style': [2, '1tbs', { 'allowSingleLine': true }],//大括号的样式，比如下面的大括号语法采用『1tbs』,允许单行样式
    'camelcase': [0, { 'properties': 'always' }],//驼峰命名
    'comma-dangle': [2, 'never'],//数组和对象键值对最后一个不允许逗号
    'comma-spacing': [2, { 'before': false, 'after': true }],//规定了逗号前后的空白，默认配置规定逗号前面没有空白，而逗号后面需要留空白
    'comma-style': [2, 'last'],//规定了逗号放的位置，默认配置逗号应该放在行末
    'constructor-super': 2, //保证constructor函数中super()应正确出现，比如在继承的classes中（派生类）必须使用super，否则（非派生类）不要使用super。
    'curly': [2, 'multi-line'], //只有块中有多行语句时才需要{ }包围, 但是块中的执行语句只有一行时，块中的语句只能跟和if语句在同一行。
    'dot-location': [2, 'property'],//'.'号应与属性在同一行  
    'eol-last': 2,//该规则规定文件最后强制换行，仅需留一空行
    'eqeqeq': [2, 'allow-null'],//在进行比较时，必须使用全等=== 和完全不等!==
    'generator-star-spacing': [2, { 'before': true, 'after': true }],//规定generator函数中星号前后的空白
    'handle-callback-err': [2, '^(err|error)$' ],//如果函数有err入参(err或者error),在函数体内必须进行处理
    'indent': [2, 2, { 'SwitchCase': 1 }],//统一代码缩进方式，2 spaces.
    'jsx-quotes': [2, 'prefer-single'],//规定了在JSX中的属性值是使用单引号
    'key-spacing': [2, { 'beforeColon': false, 'afterColon': true }],//该规则规定了在对象字面量语法中key和value之间的空白，冒号前不要留空格，冒号后面需留一个空格
    'keyword-spacing': [2, { 'before': true, 'after': true }],// 规定了keyword前后需要留一个空格
    'new-cap': [2, { 'newIsCap': true, 'capIsNew': false }],//使用构造函数(new)时首字母需大写，首字母大写的函数需用new操作符
    'new-parens': 2,//使用构造函数(new)时必须圆括号不能省略
    'no-array-constructor': 2, //禁止使用Array构造函数
    'no-caller': 2,//禁止使用arguments.caller和arguments.callee
    'no-console': 'off',//可以使用console 
    'no-class-assign': 2,//禁止覆盖class命名，也就是说变量名不要和class名重名
    'no-cond-assign': 2, //禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, //禁止修改const声明的变量
    'no-control-regex': 2, //禁止在正则表达式中使用控制符
    'no-delete-var': 2, //禁止使用delete删除var声明的变量
    'no-dupe-args': 2, //函数参数禁止重名
    'no-dupe-class-members': 2, //class中的成员不允许有相同的名字
    'no-dupe-keys': 2,//在创建对象字面量时不允许键重复 
    'no-duplicate-case': 2,//在switch语句中禁止重复的case
    'no-empty-character-class': 2,//正则表达式的内容不能为空，禁止使用不匹配任何字符串的正则表达式
    'no-empty-pattern': 2,//在结构赋值时，模式不能为空。在ECMAScript2015的结构赋值中，模式为空是不会报错的，只是这样的结构赋值没有任何效果，该条规则就保证了模式不能为空，也就保证了结构赋值的有效性。
    'no-eval': 2, //禁止使用eval函数
    'no-ex-assign': 2, //禁止对catch语句中的异常进行赋值
    'no-extend-native': 2, //禁止扩展native对象，不能向native的对象上面添加属性
    'no-extra-bind': 2, //箭头函数中没有this对象，也就不能够使用bind()方法。该规则保证了在所有的箭头函数中使用bind方法将被视为错误。
    'no-extra-boolean-cast': 2,//禁止不必要的bool转换
    'no-extra-parens': [2, 'functions'], //禁止使用多余的圆括号
    'no-fallthrough': 2,//如果没有添加break等终止语句或者没有添加注释语句，将会抛出错误
    'no-floating-decimal': 2,//在使用浮点小数时，不能够省略小数点前面的数或者后面的数，必须写。比如.2 2. 应该写2.2 2.0 
    'no-func-assign': 2, //禁止重复的函数声明
    'no-implied-eval': 2, //在setTimeout(), setInterval() or execScript()中消除隐式eval的使用
    'no-inner-declarations': [2, 'functions'],//禁止在块语句中声明变量或函数
    'no-invalid-regexp': 2,//禁止使用无效的正则语句
    'no-irregular-whitespace': 2, //禁止使用不合法或者不规则的空白符
    'no-iterator': 2, //禁止使用__iterator__属性
    'no-label-var': 2, //防止label和声明的变量重名
    'no-labels': [2, { 'allowLoop': false, 'allowSwitch': false }], //禁止使用label语句，以避免无限循环
    'no-lone-blocks': 2, //禁止使用不必要的嵌套代码块
    'no-mixed-spaces-and-tabs': 2, //禁止混用tab和空格
    'no-multi-spaces': 2,  //保证了在逻辑表达式、条件表达式、申明语句、数组元素、对象属性、sequences、函数参数中不使用超过一个的空白符。
    'no-multi-str': 2, //该规则保证了字符串不分行书写。
    'no-multiple-empty-lines': [2, { 'max': 1 }], //不要留超过规定数目的空白行
    'no-native-reassign': 2,//该规则保证了不重写原生对象
    'no-negated-in-lhs': 2,//在in操作符左边的操作项不能用! 例如这样写不对的：if ( !a in b) { //dosomething }
    'no-new-object': 2, //禁止使用new Object()来构造对象
    'no-new-require': 2,//禁止把require方法和new操作符一起使用。
    'no-new-symbol': 2, //禁止在Symbol对象前使用new操作符
    'no-new-wrappers': 2, //禁止使用new创建String,Number, and Boolean实例
    'no-obj-calls': 2, //禁止把全局对象当函数调用，比如下面写法错误的：Math(), JSON()
    'no-octal': 2, //禁止使用八进制数字
    'no-octal-escape': 2, //禁止使用八进制转义序列，比如 var foo = "Copyright \251";
    'no-path-concat': 2,//不能使用__dirname或__filename做路径拼接
    'no-proto': 2, //禁止使用__proto__属性
    'no-redeclare': 2,//避免重复声明一个变量
    'no-regex-spaces': 2,//禁止在正则表达式字面量中使用多个空格 /foo bar/
    'no-return-assign': [2, 'except-parens'],//不要在return语句中使用赋值语句
    'no-self-assign': 2, //禁止给自身赋值
    'no-self-compare': 2,//禁止和自身作比较
    'no-sequences': 2,//禁止可能导致结果不明确的逗号操作符
    'no-shadow-restricted-names': 2,//声明变量时禁止覆盖JavaScript中的一些保留关键字，比如NaN、Infinity、undefined、eval、arguments等。
    'no-spaced-func': 2,//函数调用时，函数名和圆括号之间不能有空格
    'no-sparse-arrays': 2,//禁止稀疏数组，清除多余的逗号申明  比如[1,,2]
    'no-this-before-super': 2, //在构造函数中，禁止在super()调用前使用this/super对象
    'no-throw-literal': 2,//通过throw语句抛出的对象必须是Error对象本身或者通过Error对象定义的对象
    'no-trailing-spaces': 2,//禁止行末加空格
    'no-undef': 2,//禁止使用未被定义的变量，除非已在配置文件的global中进行了说明。
    'no-undef-init': 2,//禁止初始化变量为undefined
    'no-unexpected-multiline': 2, //为了保证两行不相关的代码不会意外的被当做一行代码来解析
    'no-unmodified-loop-condition': 2,//禁止使用不被修改的循环条件
    'no-unneeded-ternary': [2, { 'defaultAssignment': false }], //禁止使用没有必要的三元操作符，因为用有些三元操作符可以使用其他语句替换
    'no-unreachable': 2,//禁止有执行不到的代码
    'no-unsafe-finally': 2,
    'no-unused-vars': [2, { 'vars': 'all', 'args': 'none' }], //不允许定义的变量在后面的代码中没有被使用到
    'no-useless-call': 2, //避免使用没有意义的call() 和 apply()
    'no-useless-computed-key': 2,
    'no-useless-constructor': 0,//ES2015提供了默认的空构造函数，禁止使用不必要的空构造函数
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,//禁用with
    'no-alert': 2,//禁用alert
    'one-var': [2, { 'initialized': 'never' }],//规定了在每个函数中声明变量是否只使用一次var，该规则同样适用于let和const
    'operator-linebreak': [2, 'after', { 'overrides': { '?': 'before', ':': 'before' } }], //在换行时操作符应该放在行首还是行尾。还可对某些操作符进行重写。
    'padded-blocks': [2, 'never'],//在代码块中，代码块的开始和结尾是否应该留一个空行
    'quotes': [2, 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],//在JavaScript中有三种方式定义字符串，双引号、单引号、反义符（ECMAScript2015）。规定了字符串定义的方式
    'semi': [2, 'always'],//默认配置always，要求在行末加上分号。
    'semi-spacing': [0, { 'before': false, 'after': true }], //该规则用来规定分号前后是否加空格
    'space-before-blocks': [2, 'always'], //规定了在代码块前是否需要加空格
    'space-before-function-paren': [2, 'never'],//函数定义时，function关键字后面的小括号前是否需要加空格
    'space-in-parens': [2, 'never'],//规定圆括号内部的空格。规定是否需要在(右边，或者)左边加空格。
    'space-infix-ops': 2,//中綴操作符左右是否添加空格
    'space-unary-ops': [2, { 'words': true, 'nonwords': false }],//规定在一元操作符前后是否需要加空格，单词类操作符需要加，而非单词类操作符不用加
    'spaced-comment': [2, 'always', { 'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] }],//规定是否需要在代码注释起始符// or /*后面至少紧跟一个空格
    'template-curly-spacing': [2, 'never'], //模板字符串中使用${ 和 } 包含的表达式前后是否需要留空格
    'use-isnan': 2, //禁止和NaN作比较,推荐使用isNaN方法
    'valid-typeof': 2, //保证typeof 操作符返回的结果必须和上面六个字符串作比较
    'wrap-iife': [2, 'any'], //立即执行函数需要通过圆括号包围
    'yield-star-spacing': [2, 'both'],//yield*表达式中的*号前后是否留空格，默认after，比如yield* other()
    'yoda': [2, 'never'], //条件语句就是对象字面量应该写在比较操作符的左边，而变量应该写在比较操作符的右边
    'prefer-const': 2,//如果一个变量声明后不再被修改，那么应使用const来声明该变量
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, //production环境禁止使用debugger语句
    'object-curly-spacing': [2, 'always', { objectsInObjects: false }], //规定对象字面量中大括号内需要加空格
    'array-bracket-spacing': [2, 'never']//数组元素前后不能带空格
}
}
