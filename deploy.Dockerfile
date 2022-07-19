FROM lsage/pnpm-circleci-node as builder

WORKDIR /code

# 匹配除src和public之外的目录
# ADD ^((?!src)(?!public))\S+ /code/
# RUN npx pnpm install

# 单独分离 public/src，是为了避免 ADD . /code 时，因为 Readme/nginx.conf 的更改避免缓存生效
# 也是为了 npm run build 可最大限度利用缓存
# ADD public /code/public
# ADD src /code/src
ADD . /code/
RUN npx pnpm install
RUN npm run build

# 选择更小体积的基础镜像
FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder code/dist /usr/share/nginx/html
