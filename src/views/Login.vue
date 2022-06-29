<script setup lang="ts">
import { useUser } from '@/store/user'
import { getQrKey, getQrCode, checkQrCode, getLoginStatus } from '@/api/login'
const user = useUser()
const router = useRouter()
const route = useRoute()

// 组件销毁时清除定时器
onUnmounted(() => {
  timer && clearInterval(timer)
})

const current = ref('code')
const form = reactive({
  mobile: '',
  password: '',
  autoLogin: true
})

/* 二维码登录 */
const qrCodeImg = ref()
let timer = null as any

function check(key: string) {
  timer = setInterval(async () => {
    const res = await checkQrCode(key)
    console.log(res);

    const status = res.code

    // 过期
    if (status === 800) {
      timer && clearInterval(timer)
    }
    // 登录成功
    if (status === 803) {
      const success = await getLoginStatus(res.cookie)
      console.log(success);

      if (success.data.code === 200) {
        timer && clearInterval(timer)
        user.setProfile(success.data.profile)
        user.setAccount(success.data.account)
        console.log(success.data);

        console.log('登录成功')
        router.push('/')
      }
    }
  }, 1000)
}
const qrCodeLogin = async () => {
  const res = await getQrKey()
  const key = res.data.unikey
  const base64 = (await getQrCode(key, true)).data.qrimg
  if (qrCodeImg.value)
    qrCodeImg.value.src = base64
  console.log(key);
  console.log(base64);
  check(key)
}
watch(current, () => {
  if (current.value === 'code') {
    qrCodeLogin()
  }
}, {
  immediate: true
})

const toggleToMobile = () => {
  timer && clearInterval(timer)
  current.value = 'mobile'
}

</script>

<template>
  <div class="login">
    <div class="login-form-container">
      <div class="go-code" v-if="current !== 'code'" @click="current = 'code'">
        <img src="@/assets/code.png" alt="">
      </div>
      <!-- 二维码登录 -->
      <div class="code-container" v-if="current === 'code'">
        <h3>扫码登录</h3>
        <img src="" alt="" ref="qrCodeImg">
        <a href="javascript:;" @click="toggleToMobile">
          使用手机号登录
        </a>
      </div>

      <!-- 手机号密码登录 -->
      <div class="mobile-container" v-if="current === 'mobile'">
        <div class="logo" v-if="true">
          <img src="@/assets/logo.png" alt="">
        </div>
        <!-- 表单 -->
        <el-form :model="form">
          <!-- 手机号 -->
          <el-form-item>
            <el-input v-model="form.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" placeholder="请输入密码" />
          </el-form-item>
          <div class="tool">
            <el-checkbox v-model="form.autoLogin">自动登录
            </el-checkbox>
            <a class="forgot" href="javascript:;">忘记密码</a>
          </div>
          <a href="javascript:;" class="login-btn">登录</a>
          <div class="option">
            <a href="javascript:;" class="register-btn">注册</a>
            <a href="javascript:;">邮箱登录</a>
          </div>
        </el-form>
      </div>
      <!-- 邮箱登录 -->
      <div class="email-container" v-if="false">
        <div class="logo" v-if="false">
          <img src="" alt="">
        </div>
        <input type="number">
        <input type="password">
        <div class="tool">
          <a href="javascript:;">忘记密码</a>
        </div>
        <button class="login-btn">登录</button>
        <a href="javascript:;">注册</a>
        <a href="javascript:;">手机号登录</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fafafa;


  .login-form-container {
    position: relative;
    width: 300px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 5px 15px;
    border-radius: 10px;

    // 
    .go-code {
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;
      transform: rotateZ(180deg);
      cursor: pointer;
    }

    // 扫码登录
    .code-container {
      text-align: center;
      padding: 30px 10px 20px 10px;

      h3 {
        font-size: 22px;
      }

      a {
        font-size: 12px;
        color: #666666;
      }
    }

    // 手机号登录
    .mobile-container {
      padding: 30px 20px 20px 20px;

      .logo {
        text-align: center;

        img {
          width: 30%;
        }
      }

      .tool {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .forgot {
          color: #666;
        }

        :deep(.el-checkbox) {
          font-size: 12px;
        }
      }

      .login-btn {
        display: block;
        padding: 10px 0;
        text-align: center;
        background-color: var(--theme-color);
        border-radius: 10px;
        margin: 10px 0;
        color: #fff;

        &:hover {
          background-color: var(--theme-color-hover);
        }
      }

      .option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #666;
        margin: 10px 0;

        .register-btn {}
      }

    }
  }
}
</style>

