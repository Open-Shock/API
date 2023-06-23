const t = (t) => {
    let e = [];
    for (let a = 0; a < t.length; a++) {
        let i = t.charCodeAt(a);
        i <= 255 && e.push(i);
    }
    return e;
},
e = (t) => "[" + t.map((t) => a(t)).join(", ") + "]",
a = (t, e = 2) => {
    let a = t.toString(16).toUpperCase();
    return a.startsWith("-") ? "-0x" + a.substring(1).padStart(e, "0") : "0x" + a.padStart(e, "0");
},
i = (t) => new Promise((e) => setTimeout(e, t)),
s = { 18: "256KB", 19: "512KB", 20: "1MB", 21: "2MB", 22: "4MB", 23: "8MB", 24: "16MB", 25: "32MB", 26: "64MB" },
r = 115200,
n = t(" UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"),
o = 33382,
l = 50,
h = 12882,
d = 12883,
f = 12995,
_ = 12998,
c = 12914,
u = {
    4293968129: { name: "ESP8266", family: o },
    15736195: { name: "ESP32", family: l },
    1990: { name: "ESP32-S2", family: h },
    9: { name: "ESP32-S3", family: d },
    3942662454: { name: "ESP32-S3(beta2)", family: d },
    1763790959: { name: "ESP32-C3", family: f },
    456216687: { name: "ESP32-C3", family: f },
    3391540258: { name: "ESP32-H2", family: 12914 },
    228687983: { name: "ESP32-C6(beta)", family: 12998 },
},
g = 3e3,
w = 6e5,
m = (t, e) => {
    let a = Math.floor(t * (e / 486));
    return a < g ? g : a;
},
p = (t) => {
    switch (t) {
        case l:
            return { regBase: 1072963584, baseFuse: 1073061888, macFuse: 1073061888, usrOffs: 28, usr1Offs: 32, usr2Offs: 36, mosiDlenOffs: 40, misoDlenOffs: 44, w0Offs: 128, uartDateReg: 1610612856, flashOffs: 4096 };
        case h:
            return { regBase: 1061167104, baseFuse: 1061265408, macFuse: 1061265476, usrOffs: 24, usr1Offs: 28, usr2Offs: 32, mosiDlenOffs: 36, misoDlenOffs: 40, w0Offs: 88, uartDateReg: 1610612856, flashOffs: 4096 };
        case d:
            return { regBase: 1610620928, usrOffs: 24, baseFuse: 1610641408, macFuse: 1610641476, usr1Offs: 28, usr2Offs: 32, mosiDlenOffs: 36, misoDlenOffs: 40, w0Offs: 88, uartDateReg: 1610612864, flashOffs: 0 };
        case o:
            return { regBase: 1610613248, usrOffs: 28, baseFuse: 1072693328, macFuse: 1072693328, usr1Offs: 32, usr2Offs: 36, mosiDlenOffs: -1, misoDlenOffs: -1, w0Offs: 64, uartDateReg: 1610612856, flashOffs: 0 };
        case f:
            return { regBase: 1610620928, baseFuse: 1610647552, macFuse: 1610647620, usrOffs: 24, usr1Offs: 28, usr2Offs: 32, mosiDlenOffs: 36, misoDlenOffs: 40, w0Offs: 88, uartDateReg: 1610612860, flashOffs: 0 };
        default:
            return { regBase: -1, baseFuse: -1, macFuse: -1, usrOffs: -1, usr1Offs: -1, usr2Offs: -1, mosiDlenOffs: -1, misoDlenOffs: -1, w0Offs: -1, uartDateReg: -1, flashOffs: -1 };
    }
};
class b extends Error {
constructor(t) {
    super(t), (this.name = "SlipReadError");
}
}
const y = async (e) => {
let a;
return (
    e == l
        ? (a = await import("./esp32-273074c1.js"))
        : e == h
        ? (a = await import("./esp32s2-f8cf1215.js"))
        : e == d
        ? (a = await import("./esp32s3-b0a5f517.js"))
        : e == o
        ? (a = await import("./esp8266-b7fae3a7.js"))
        : e == f && (a = await import("./esp32c3-8f007052.js")),
    { ...a, text: t(atob(a.text)), data: t(atob(a.data)) }
);
};
function k(t) {
let e = t.length;
for (; --e >= 0; ) t[e] = 0;
}
const v = 256,
x = 286,
z = 30,
S = 15,
U = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]),
E = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]),
R = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),
A = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
I = new Array(576);
k(I);
const D = new Array(60);
k(D);
const F = new Array(512);
k(F);
const B = new Array(256);
k(B);
const O = new Array(29);
k(O);
const C = new Array(z);
function T(t, e, a, i, s) {
(this.static_tree = t), (this.extra_bits = e), (this.extra_base = a), (this.elems = i), (this.max_length = s), (this.has_stree = t && t.length);
}
let Z, L, M;
function N(t, e) {
(this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e);
}
k(C);
const P = (t) => (t < 256 ? F[t] : F[256 + (t >>> 7)]),
H = (t, e) => {
    (t.pending_buf[t.pending++] = 255 & e), (t.pending_buf[t.pending++] = (e >>> 8) & 255);
},
$ = (t, e, a) => {
    t.bi_valid > 16 - a ? ((t.bi_buf |= (e << t.bi_valid) & 65535), H(t, t.bi_buf), (t.bi_buf = e >> (16 - t.bi_valid)), (t.bi_valid += a - 16)) : ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += a));
},
j = (t, e, a) => {
    $(t, a[2 * e], a[2 * e + 1]);
},
V = (t, e) => {
    let a = 0;
    do {
        (a |= 1 & t), (t >>>= 1), (a <<= 1);
    } while (--e > 0);
    return a >>> 1;
},
W = (t, e, a) => {
    const i = new Array(16);
    let s,
        r,
        n = 0;
    for (s = 1; s <= S; s++) (n = (n + a[s - 1]) << 1), (i[s] = n);
    for (r = 0; r <= e; r++) {
        let e = t[2 * r + 1];
        0 !== e && (t[2 * r] = V(i[e]++, e));
    }
},
K = (t) => {
    let e;
    for (e = 0; e < x; e++) t.dyn_ltree[2 * e] = 0;
    for (e = 0; e < z; e++) t.dyn_dtree[2 * e] = 0;
    for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0;
    (t.dyn_ltree[512] = 1), (t.opt_len = t.static_len = 0), (t.sym_next = t.matches = 0);
},
Y = (t) => {
    t.bi_valid > 8 ? H(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0);
},
q = (t, e, a, i) => {
    const s = 2 * e,
        r = 2 * a;
    return t[s] < t[r] || (t[s] === t[r] && i[e] <= i[a]);
},
G = (t, e, a) => {
    const i = t.heap[a];
    let s = a << 1;
    for (; s <= t.heap_len && (s < t.heap_len && q(e, t.heap[s + 1], t.heap[s], t.depth) && s++, !q(e, i, t.heap[s], t.depth)); ) (t.heap[a] = t.heap[s]), (a = s), (s <<= 1);
    t.heap[a] = i;
},
X = (t, e, a) => {
    let i,
        s,
        r,
        n,
        o = 0;
    if (0 !== t.sym_next)
        do {
            (i = 255 & t.pending_buf[t.sym_buf + o++]),
                (i += (255 & t.pending_buf[t.sym_buf + o++]) << 8),
                (s = t.pending_buf[t.sym_buf + o++]),
                0 === i ? j(t, s, e) : ((r = B[s]), j(t, r + v + 1, e), (n = U[r]), 0 !== n && ((s -= O[r]), $(t, s, n)), i--, (r = P(i)), j(t, r, a), (n = E[r]), 0 !== n && ((i -= C[r]), $(t, i, n)));
        } while (o < t.sym_next);
    j(t, 256, e);
},
Q = (t, e) => {
    const a = e.dyn_tree,
        i = e.stat_desc.static_tree,
        s = e.stat_desc.has_stree,
        r = e.stat_desc.elems;
    let n,
        o,
        l,
        h = -1;
    for (t.heap_len = 0, t.heap_max = 573, n = 0; n < r; n++) 0 !== a[2 * n] ? ((t.heap[++t.heap_len] = h = n), (t.depth[n] = 0)) : (a[2 * n + 1] = 0);
    for (; t.heap_len < 2; ) (l = t.heap[++t.heap_len] = h < 2 ? ++h : 0), (a[2 * l] = 1), (t.depth[l] = 0), t.opt_len--, s && (t.static_len -= i[2 * l + 1]);
    for (e.max_code = h, n = t.heap_len >> 1; n >= 1; n--) G(t, a, n);
    l = r;
    do {
        (n = t.heap[1]),
            (t.heap[1] = t.heap[t.heap_len--]),
            G(t, a, 1),
            (o = t.heap[1]),
            (t.heap[--t.heap_max] = n),
            (t.heap[--t.heap_max] = o),
            (a[2 * l] = a[2 * n] + a[2 * o]),
            (t.depth[l] = (t.depth[n] >= t.depth[o] ? t.depth[n] : t.depth[o]) + 1),
            (a[2 * n + 1] = a[2 * o + 1] = l),
            (t.heap[1] = l++),
            G(t, a, 1);
    } while (t.heap_len >= 2);
    (t.heap[--t.heap_max] = t.heap[1]),
        ((t, e) => {
            const a = e.dyn_tree,
                i = e.max_code,
                s = e.stat_desc.static_tree,
                r = e.stat_desc.has_stree,
                n = e.stat_desc.extra_bits,
                o = e.stat_desc.extra_base,
                l = e.stat_desc.max_length;
            let h,
                d,
                f,
                _,
                c,
                u,
                g = 0;
            for (_ = 0; _ <= S; _++) t.bl_count[_] = 0;
            for (a[2 * t.heap[t.heap_max] + 1] = 0, h = t.heap_max + 1; h < 573; h++)
                (d = t.heap[h]),
                    (_ = a[2 * a[2 * d + 1] + 1] + 1),
                    _ > l && ((_ = l), g++),
                    (a[2 * d + 1] = _),
                    d > i || (t.bl_count[_]++, (c = 0), d >= o && (c = n[d - o]), (u = a[2 * d]), (t.opt_len += u * (_ + c)), r && (t.static_len += u * (s[2 * d + 1] + c)));
            if (0 !== g) {
                do {
                    for (_ = l - 1; 0 === t.bl_count[_]; ) _--;
                    t.bl_count[_]--, (t.bl_count[_ + 1] += 2), t.bl_count[l]--, (g -= 2);
                } while (g > 0);
                for (_ = l; 0 !== _; _--) for (d = t.bl_count[_]; 0 !== d; ) (f = t.heap[--h]), f > i || (a[2 * f + 1] !== _ && ((t.opt_len += (_ - a[2 * f + 1]) * a[2 * f]), (a[2 * f + 1] = _)), d--);
            }
        })(t, e),
        W(a, h, t.bl_count);
},
J = (t, e, a) => {
    let i,
        s,
        r = -1,
        n = e[1],
        o = 0,
        l = 7,
        h = 4;
    for (0 === n && ((l = 138), (h = 3)), e[2 * (a + 1) + 1] = 65535, i = 0; i <= a; i++)
        (s = n),
            (n = e[2 * (i + 1) + 1]),
            (++o < l && s === n) ||
                (o < h ? (t.bl_tree[2 * s] += o) : 0 !== s ? (s !== r && t.bl_tree[2 * s]++, t.bl_tree[32]++) : o <= 10 ? t.bl_tree[34]++ : t.bl_tree[36]++,
                (o = 0),
                (r = s),
                0 === n ? ((l = 138), (h = 3)) : s === n ? ((l = 6), (h = 3)) : ((l = 7), (h = 4)));
},
tt = (t, e, a) => {
    let i,
        s,
        r = -1,
        n = e[1],
        o = 0,
        l = 7,
        h = 4;
    for (0 === n && ((l = 138), (h = 3)), i = 0; i <= a; i++)
        if (((s = n), (n = e[2 * (i + 1) + 1]), !(++o < l && s === n))) {
            if (o < h)
                do {
                    j(t, s, t.bl_tree);
                } while (0 != --o);
            else 0 !== s ? (s !== r && (j(t, s, t.bl_tree), o--), j(t, 16, t.bl_tree), $(t, o - 3, 2)) : o <= 10 ? (j(t, 17, t.bl_tree), $(t, o - 3, 3)) : (j(t, 18, t.bl_tree), $(t, o - 11, 7));
            (o = 0), (r = s), 0 === n ? ((l = 138), (h = 3)) : s === n ? ((l = 6), (h = 3)) : ((l = 7), (h = 4));
        }
};
let et = !1;
const at = (t, e, a, i) => {
$(t, 0 + (i ? 1 : 0), 3), Y(t), H(t, a), H(t, ~a), a && t.pending_buf.set(t.window.subarray(e, e + a), t.pending), (t.pending += a);
};
var it = (t, e, a, i) => {
    let s,
        r,
        n = 0;
    t.level > 0
        ? (2 === t.strm.data_type &&
              (t.strm.data_type = ((t) => {
                  let e,
                      a = 4093624447;
                  for (e = 0; e <= 31; e++, a >>>= 1) if (1 & a && 0 !== t.dyn_ltree[2 * e]) return 0;
                  if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return 1;
                  for (e = 32; e < v; e++) if (0 !== t.dyn_ltree[2 * e]) return 1;
                  return 0;
              })(t)),
          Q(t, t.l_desc),
          Q(t, t.d_desc),
          (n = ((t) => {
              let e;
              for (J(t, t.dyn_ltree, t.l_desc.max_code), J(t, t.dyn_dtree, t.d_desc.max_code), Q(t, t.bl_desc), e = 18; e >= 3 && 0 === t.bl_tree[2 * A[e] + 1]; e--);
              return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
          })(t)),
          (s = (t.opt_len + 3 + 7) >>> 3),
          (r = (t.static_len + 3 + 7) >>> 3),
          r <= s && (s = r))
        : (s = r = a + 5),
        a + 4 <= s && -1 !== e
            ? at(t, e, a, i)
            : 4 === t.strategy || r === s
            ? ($(t, 2 + (i ? 1 : 0), 3), X(t, I, D))
            : ($(t, 4 + (i ? 1 : 0), 3),
              ((t, e, a, i) => {
                  let s;
                  for ($(t, e - 257, 5), $(t, a - 1, 5), $(t, i - 4, 4), s = 0; s < i; s++) $(t, t.bl_tree[2 * A[s] + 1], 3);
                  tt(t, t.dyn_ltree, e - 1), tt(t, t.dyn_dtree, a - 1);
              })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, n + 1),
              X(t, t.dyn_ltree, t.dyn_dtree)),
        K(t),
        i && Y(t);
},
st = {
    _tr_init: (t) => {
        et ||
            ((() => {
                let t, e, a, i, s;
                const r = new Array(16);
                for (a = 0, i = 0; i < 28; i++) for (O[i] = a, t = 0; t < 1 << U[i]; t++) B[a++] = i;
                for (B[a - 1] = i, s = 0, i = 0; i < 16; i++) for (C[i] = s, t = 0; t < 1 << E[i]; t++) F[s++] = i;
                for (s >>= 7; i < z; i++) for (C[i] = s << 7, t = 0; t < 1 << (E[i] - 7); t++) F[256 + s++] = i;
                for (e = 0; e <= S; e++) r[e] = 0;
                for (t = 0; t <= 143; ) (I[2 * t + 1] = 8), t++, r[8]++;
                for (; t <= 255; ) (I[2 * t + 1] = 9), t++, r[9]++;
                for (; t <= 279; ) (I[2 * t + 1] = 7), t++, r[7]++;
                for (; t <= 287; ) (I[2 * t + 1] = 8), t++, r[8]++;
                for (W(I, 287, r), t = 0; t < z; t++) (D[2 * t + 1] = 5), (D[2 * t] = V(t, 5));
                (Z = new T(I, U, 257, x, S)), (L = new T(D, E, 0, z, S)), (M = new T(new Array(0), R, 0, 19, 7));
            })(),
            (et = !0)),
            (t.l_desc = new N(t.dyn_ltree, Z)),
            (t.d_desc = new N(t.dyn_dtree, L)),
            (t.bl_desc = new N(t.bl_tree, M)),
            (t.bi_buf = 0),
            (t.bi_valid = 0),
            K(t);
    },
    _tr_stored_block: at,
    _tr_flush_block: it,
    _tr_tally: (t, e, a) => (
        (t.pending_buf[t.sym_buf + t.sym_next++] = e),
        (t.pending_buf[t.sym_buf + t.sym_next++] = e >> 8),
        (t.pending_buf[t.sym_buf + t.sym_next++] = a),
        0 === e ? t.dyn_ltree[2 * a]++ : (t.matches++, e--, t.dyn_ltree[2 * (B[a] + v + 1)]++, t.dyn_dtree[2 * P(e)]++),
        t.sym_next === t.sym_end
    ),
    _tr_align: (t) => {
        $(t, 2, 3),
            j(t, 256, I),
            ((t) => {
                16 === t.bi_valid ? (H(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0)) : t.bi_valid >= 8 && ((t.pending_buf[t.pending++] = 255 & t.bi_buf), (t.bi_buf >>= 8), (t.bi_valid -= 8));
            })(t);
    },
};
var rt = (t, e, a, i) => {
let s = (65535 & t) | 0,
    r = ((t >>> 16) & 65535) | 0,
    n = 0;
for (; 0 !== a; ) {
    (n = a > 2e3 ? 2e3 : a), (a -= n);
    do {
        (s = (s + e[i++]) | 0), (r = (r + s) | 0);
    } while (--n);
    (s %= 65521), (r %= 65521);
}
return s | (r << 16) | 0;
};
const nt = new Uint32Array(
(() => {
    let t,
        e = [];
    for (var a = 0; a < 256; a++) {
        t = a;
        for (var i = 0; i < 8; i++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
        e[a] = t;
    }
    return e;
})()
);
var ot = (t, e, a, i) => {
    const s = nt,
        r = i + a;
    t ^= -1;
    for (let a = i; a < r; a++) t = (t >>> 8) ^ s[255 & (t ^ e[a])];
    return -1 ^ t;
},
lt = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" },
ht = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8,
};
const { _tr_init: dt, _tr_stored_block: ft, _tr_flush_block: _t, _tr_tally: ct, _tr_align: ut } = st,
{
    Z_NO_FLUSH: gt,
    Z_PARTIAL_FLUSH: wt,
    Z_FULL_FLUSH: mt,
    Z_FINISH: pt,
    Z_BLOCK: bt,
    Z_OK: yt,
    Z_STREAM_END: kt,
    Z_STREAM_ERROR: vt,
    Z_DATA_ERROR: xt,
    Z_BUF_ERROR: zt,
    Z_DEFAULT_COMPRESSION: St,
    Z_FILTERED: Ut,
    Z_HUFFMAN_ONLY: Et,
    Z_RLE: Rt,
    Z_FIXED: At,
    Z_DEFAULT_STRATEGY: It,
    Z_UNKNOWN: Dt,
    Z_DEFLATED: Ft,
} = ht,
Bt = 286,
Ot = 30,
Ct = 19,
Tt = 2 * Bt + 1,
Zt = 15,
Lt = 258,
Mt = 262,
Nt = 42,
Pt = 113,
Ht = 666,
$t = (t, e) => ((t.msg = lt[e]), e),
jt = (t) => 2 * t - (t > 4 ? 9 : 0),
Vt = (t) => {
    let e = t.length;
    for (; --e >= 0; ) t[e] = 0;
},
Wt = (t) => {
    let e,
        a,
        i,
        s = t.w_size;
    (e = t.hash_size), (i = e);
    do {
        (a = t.head[--i]), (t.head[i] = a >= s ? a - s : 0);
    } while (--e);
    (e = s), (i = e);
    do {
        (a = t.prev[--i]), (t.prev[i] = a >= s ? a - s : 0);
    } while (--e);
};
let Kt = (t, e, a) => ((e << t.hash_shift) ^ a) & t.hash_mask;
const Yt = (t) => {
    const e = t.state;
    let a = e.pending;
    a > t.avail_out && (a = t.avail_out),
        0 !== a &&
            (t.output.set(e.pending_buf.subarray(e.pending_out, e.pending_out + a), t.next_out), (t.next_out += a), (e.pending_out += a), (t.total_out += a), (t.avail_out -= a), (e.pending -= a), 0 === e.pending && (e.pending_out = 0));
},
qt = (t, e) => {
    _t(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), (t.block_start = t.strstart), Yt(t.strm);
},
Gt = (t, e) => {
    t.pending_buf[t.pending++] = e;
},
Xt = (t, e) => {
    (t.pending_buf[t.pending++] = (e >>> 8) & 255), (t.pending_buf[t.pending++] = 255 & e);
},
Qt = (t, e, a, i) => {
    let s = t.avail_in;
    return (
        s > i && (s = i),
        0 === s
            ? 0
            : ((t.avail_in -= s),
              e.set(t.input.subarray(t.next_in, t.next_in + s), a),
              1 === t.state.wrap ? (t.adler = rt(t.adler, e, s, a)) : 2 === t.state.wrap && (t.adler = ot(t.adler, e, s, a)),
              (t.next_in += s),
              (t.total_in += s),
              s)
    );
},
Jt = (t, e) => {
    let a,
        i,
        s = t.max_chain_length,
        r = t.strstart,
        n = t.prev_length,
        o = t.nice_match;
    const l = t.strstart > t.w_size - Mt ? t.strstart - (t.w_size - Mt) : 0,
        h = t.window,
        d = t.w_mask,
        f = t.prev,
        _ = t.strstart + Lt;
    let c = h[r + n - 1],
        u = h[r + n];
    t.prev_length >= t.good_match && (s >>= 2), o > t.lookahead && (o = t.lookahead);
    do {
        if (((a = e), h[a + n] === u && h[a + n - 1] === c && h[a] === h[r] && h[++a] === h[r + 1])) {
            (r += 2), a++;
            do {} while (h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && h[++r] === h[++a] && r < _);
            if (((i = Lt - (_ - r)), (r = _ - Lt), i > n)) {
                if (((t.match_start = e), (n = i), i >= o)) break;
                (c = h[r + n - 1]), (u = h[r + n]);
            }
        }
    } while ((e = f[e & d]) > l && 0 != --s);
    return n <= t.lookahead ? n : t.lookahead;
},
te = (t) => {
    const e = t.w_size;
    let a, i, s;
    do {
        if (
            ((i = t.window_size - t.lookahead - t.strstart),
            t.strstart >= e + (e - Mt) && (t.window.set(t.window.subarray(e, e + e - i), 0), (t.match_start -= e), (t.strstart -= e), (t.block_start -= e), t.insert > t.strstart && (t.insert = t.strstart), Wt(t), (i += e)),
            0 === t.strm.avail_in)
        )
            break;
        if (((a = Qt(t.strm, t.window, t.strstart + t.lookahead, i)), (t.lookahead += a), t.lookahead + t.insert >= 3))
            for (
                s = t.strstart - t.insert, t.ins_h = t.window[s], t.ins_h = Kt(t, t.ins_h, t.window[s + 1]);
                t.insert && ((t.ins_h = Kt(t, t.ins_h, t.window[s + 3 - 1])), (t.prev[s & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = s), s++, t.insert--, !(t.lookahead + t.insert < 3));

            );
    } while (t.lookahead < Mt && 0 !== t.strm.avail_in);
},
ee = (t, e) => {
    let a,
        i,
        s,
        r = t.pending_buf_size - 5 > t.w_size ? t.w_size : t.pending_buf_size - 5,
        n = 0,
        o = t.strm.avail_in;
    do {
        if (((a = 65535), (s = (t.bi_valid + 42) >> 3), t.strm.avail_out < s)) break;
        if (((s = t.strm.avail_out - s), (i = t.strstart - t.block_start), a > i + t.strm.avail_in && (a = i + t.strm.avail_in), a > s && (a = s), a < r && ((0 === a && e !== pt) || e === gt || a !== i + t.strm.avail_in))) break;
        (n = e === pt && a === i + t.strm.avail_in ? 1 : 0),
            ft(t, 0, 0, n),
            (t.pending_buf[t.pending - 4] = a),
            (t.pending_buf[t.pending - 3] = a >> 8),
            (t.pending_buf[t.pending - 2] = ~a),
            (t.pending_buf[t.pending - 1] = ~a >> 8),
            Yt(t.strm),
            i && (i > a && (i = a), t.strm.output.set(t.window.subarray(t.block_start, t.block_start + i), t.strm.next_out), (t.strm.next_out += i), (t.strm.avail_out -= i), (t.strm.total_out += i), (t.block_start += i), (a -= i)),
            a && (Qt(t.strm, t.strm.output, t.strm.next_out, a), (t.strm.next_out += a), (t.strm.avail_out -= a), (t.strm.total_out += a));
    } while (0 === n);
    return (
        (o -= t.strm.avail_in),
        o &&
            (o >= t.w_size
                ? ((t.matches = 2), t.window.set(t.strm.input.subarray(t.strm.next_in - t.w_size, t.strm.next_in), 0), (t.strstart = t.w_size), (t.insert = t.strstart))
                : (t.window_size - t.strstart <= o && ((t.strstart -= t.w_size), t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0), t.matches < 2 && t.matches++, t.insert > t.strstart && (t.insert = t.strstart)),
                  t.window.set(t.strm.input.subarray(t.strm.next_in - o, t.strm.next_in), t.strstart),
                  (t.strstart += o),
                  (t.insert += o > t.w_size - t.insert ? t.w_size - t.insert : o)),
            (t.block_start = t.strstart)),
        t.high_water < t.strstart && (t.high_water = t.strstart),
        n
            ? 4
            : e !== gt && e !== pt && 0 === t.strm.avail_in && t.strstart === t.block_start
            ? 2
            : ((s = t.window_size - t.strstart),
              t.strm.avail_in > s &&
                  t.block_start >= t.w_size &&
                  ((t.block_start -= t.w_size),
                  (t.strstart -= t.w_size),
                  t.window.set(t.window.subarray(t.w_size, t.w_size + t.strstart), 0),
                  t.matches < 2 && t.matches++,
                  (s += t.w_size),
                  t.insert > t.strstart && (t.insert = t.strstart)),
              s > t.strm.avail_in && (s = t.strm.avail_in),
              s && (Qt(t.strm, t.window, t.strstart, s), (t.strstart += s), (t.insert += s > t.w_size - t.insert ? t.w_size - t.insert : s)),
              t.high_water < t.strstart && (t.high_water = t.strstart),
              (s = (t.bi_valid + 42) >> 3),
              (s = t.pending_buf_size - s > 65535 ? 65535 : t.pending_buf_size - s),
              (r = s > t.w_size ? t.w_size : s),
              (i = t.strstart - t.block_start),
              (i >= r || ((i || e === pt) && e !== gt && 0 === t.strm.avail_in && i <= s)) &&
                  ((a = i > s ? s : i), (n = e === pt && 0 === t.strm.avail_in && a === i ? 1 : 0), ft(t, t.block_start, a, n), (t.block_start += a), Yt(t.strm)),
              n ? 3 : 1)
    );
},
ae = (t, e) => {
    let a, i;
    for (;;) {
        if (t.lookahead < Mt) {
            if ((te(t), t.lookahead < Mt && e === gt)) return 1;
            if (0 === t.lookahead) break;
        }
        if (
            ((a = 0),
            t.lookahead >= 3 && ((t.ins_h = Kt(t, t.ins_h, t.window[t.strstart + 3 - 1])), (a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart)),
            0 !== a && t.strstart - a <= t.w_size - Mt && (t.match_length = Jt(t, a)),
            t.match_length >= 3)
        )
            if (((i = ct(t, t.strstart - t.match_start, t.match_length - 3)), (t.lookahead -= t.match_length), t.match_length <= t.max_lazy_match && t.lookahead >= 3)) {
                t.match_length--;
                do {
                    t.strstart++, (t.ins_h = Kt(t, t.ins_h, t.window[t.strstart + 3 - 1])), (a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart);
                } while (0 != --t.match_length);
                t.strstart++;
            } else (t.strstart += t.match_length), (t.match_length = 0), (t.ins_h = t.window[t.strstart]), (t.ins_h = Kt(t, t.ins_h, t.window[t.strstart + 1]));
        else (i = ct(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++;
        if (i && (qt(t, !1), 0 === t.strm.avail_out)) return 1;
    }
    return (t.insert = t.strstart < 2 ? t.strstart : 2), e === pt ? (qt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.sym_next && (qt(t, !1), 0 === t.strm.avail_out) ? 1 : 2;
},
ie = (t, e) => {
    let a, i, s;
    for (;;) {
        if (t.lookahead < Mt) {
            if ((te(t), t.lookahead < Mt && e === gt)) return 1;
            if (0 === t.lookahead) break;
        }
        if (
            ((a = 0),
            t.lookahead >= 3 && ((t.ins_h = Kt(t, t.ins_h, t.window[t.strstart + 3 - 1])), (a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart)),
            (t.prev_length = t.match_length),
            (t.prev_match = t.match_start),
            (t.match_length = 2),
            0 !== a &&
                t.prev_length < t.max_lazy_match &&
                t.strstart - a <= t.w_size - Mt &&
                ((t.match_length = Jt(t, a)), t.match_length <= 5 && (t.strategy === Ut || (3 === t.match_length && t.strstart - t.match_start > 4096)) && (t.match_length = 2)),
            t.prev_length >= 3 && t.match_length <= t.prev_length)
        ) {
            (s = t.strstart + t.lookahead - 3), (i = ct(t, t.strstart - 1 - t.prev_match, t.prev_length - 3)), (t.lookahead -= t.prev_length - 1), (t.prev_length -= 2);
            do {
                ++t.strstart <= s && ((t.ins_h = Kt(t, t.ins_h, t.window[t.strstart + 3 - 1])), (a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart));
            } while (0 != --t.prev_length);
            if (((t.match_available = 0), (t.match_length = 2), t.strstart++, i && (qt(t, !1), 0 === t.strm.avail_out))) return 1;
        } else if (t.match_available) {
            if (((i = ct(t, 0, t.window[t.strstart - 1])), i && qt(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out)) return 1;
        } else (t.match_available = 1), t.strstart++, t.lookahead--;
    }
    return (
        t.match_available && ((i = ct(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)),
        (t.insert = t.strstart < 2 ? t.strstart : 2),
        e === pt ? (qt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.sym_next && (qt(t, !1), 0 === t.strm.avail_out) ? 1 : 2
    );
};
function se(t, e, a, i, s) {
(this.good_length = t), (this.max_lazy = e), (this.nice_length = a), (this.max_chain = i), (this.func = s);
}
const re = [
new se(0, 0, 0, 0, ee),
new se(4, 4, 8, 4, ae),
new se(4, 5, 16, 8, ae),
new se(4, 6, 32, 32, ae),
new se(4, 4, 16, 16, ie),
new se(8, 16, 32, 32, ie),
new se(8, 16, 128, 128, ie),
new se(8, 32, 128, 256, ie),
new se(32, 128, 258, 1024, ie),
new se(32, 258, 258, 4096, ie),
];
function ne() {
(this.strm = null),
    (this.status = 0),
    (this.pending_buf = null),
    (this.pending_buf_size = 0),
    (this.pending_out = 0),
    (this.pending = 0),
    (this.wrap = 0),
    (this.gzhead = null),
    (this.gzindex = 0),
    (this.method = Ft),
    (this.last_flush = -1),
    (this.w_size = 0),
    (this.w_bits = 0),
    (this.w_mask = 0),
    (this.window = null),
    (this.window_size = 0),
    (this.prev = null),
    (this.head = null),
    (this.ins_h = 0),
    (this.hash_size = 0),
    (this.hash_bits = 0),
    (this.hash_mask = 0),
    (this.hash_shift = 0),
    (this.block_start = 0),
    (this.match_length = 0),
    (this.prev_match = 0),
    (this.match_available = 0),
    (this.strstart = 0),
    (this.match_start = 0),
    (this.lookahead = 0),
    (this.prev_length = 0),
    (this.max_chain_length = 0),
    (this.max_lazy_match = 0),
    (this.level = 0),
    (this.strategy = 0),
    (this.good_match = 0),
    (this.nice_match = 0),
    (this.dyn_ltree = new Uint16Array(2 * Tt)),
    (this.dyn_dtree = new Uint16Array(2 * (2 * Ot + 1))),
    (this.bl_tree = new Uint16Array(2 * (2 * Ct + 1))),
    Vt(this.dyn_ltree),
    Vt(this.dyn_dtree),
    Vt(this.bl_tree),
    (this.l_desc = null),
    (this.d_desc = null),
    (this.bl_desc = null),
    (this.bl_count = new Uint16Array(Zt + 1)),
    (this.heap = new Uint16Array(2 * Bt + 1)),
    Vt(this.heap),
    (this.heap_len = 0),
    (this.heap_max = 0),
    (this.depth = new Uint16Array(2 * Bt + 1)),
    Vt(this.depth),
    (this.sym_buf = 0),
    (this.lit_bufsize = 0),
    (this.sym_next = 0),
    (this.sym_end = 0),
    (this.opt_len = 0),
    (this.static_len = 0),
    (this.matches = 0),
    (this.insert = 0),
    (this.bi_buf = 0),
    (this.bi_valid = 0);
}
const oe = (t) => {
    if (!t) return 1;
    const e = t.state;
    return !e || e.strm !== t || (e.status !== Nt && 57 !== e.status && 69 !== e.status && 73 !== e.status && 91 !== e.status && 103 !== e.status && e.status !== Pt && e.status !== Ht) ? 1 : 0;
},
le = (t) => {
    if (oe(t)) return $t(t, vt);
    (t.total_in = t.total_out = 0), (t.data_type = Dt);
    const e = t.state;
    return (e.pending = 0), (e.pending_out = 0), e.wrap < 0 && (e.wrap = -e.wrap), (e.status = 2 === e.wrap ? 57 : e.wrap ? Nt : Pt), (t.adler = 2 === e.wrap ? 0 : 1), (e.last_flush = -2), dt(e), yt;
},
he = (t) => {
    const e = le(t);
    var a;
    return (
        e === yt &&
            (((a = t.state).window_size = 2 * a.w_size),
            Vt(a.head),
            (a.max_lazy_match = re[a.level].max_lazy),
            (a.good_match = re[a.level].good_length),
            (a.nice_match = re[a.level].nice_length),
            (a.max_chain_length = re[a.level].max_chain),
            (a.strstart = 0),
            (a.block_start = 0),
            (a.lookahead = 0),
            (a.insert = 0),
            (a.match_length = a.prev_length = 2),
            (a.match_available = 0),
            (a.ins_h = 0)),
        e
    );
},
de = (t, e, a, i, s, r) => {
    if (!t) return vt;
    let n = 1;
    if ((e === St && (e = 6), i < 0 ? ((n = 0), (i = -i)) : i > 15 && ((n = 2), (i -= 16)), s < 1 || s > 9 || a !== Ft || i < 8 || i > 15 || e < 0 || e > 9 || r < 0 || r > At || (8 === i && 1 !== n))) return $t(t, vt);
    8 === i && (i = 9);
    const o = new ne();
    return (
        (t.state = o),
        (o.strm = t),
        (o.status = Nt),
        (o.wrap = n),
        (o.gzhead = null),
        (o.w_bits = i),
        (o.w_size = 1 << o.w_bits),
        (o.w_mask = o.w_size - 1),
        (o.hash_bits = s + 7),
        (o.hash_size = 1 << o.hash_bits),
        (o.hash_mask = o.hash_size - 1),
        (o.hash_shift = ~~((o.hash_bits + 3 - 1) / 3)),
        (o.window = new Uint8Array(2 * o.w_size)),
        (o.head = new Uint16Array(o.hash_size)),
        (o.prev = new Uint16Array(o.w_size)),
        (o.lit_bufsize = 1 << (s + 6)),
        (o.pending_buf_size = 4 * o.lit_bufsize),
        (o.pending_buf = new Uint8Array(o.pending_buf_size)),
        (o.sym_buf = o.lit_bufsize),
        (o.sym_end = 3 * (o.lit_bufsize - 1)),
        (o.level = e),
        (o.strategy = r),
        (o.method = a),
        he(t)
    );
};
var fe = {
deflateInit: (t, e) => de(t, e, Ft, 15, 8, It),
deflateInit2: de,
deflateReset: he,
deflateResetKeep: le,
deflateSetHeader: (t, e) => (oe(t) || 2 !== t.state.wrap ? vt : ((t.state.gzhead = e), yt)),
deflate: (t, e) => {
    if (oe(t) || e > bt || e < 0) return t ? $t(t, vt) : vt;
    const a = t.state;
    if (!t.output || (0 !== t.avail_in && !t.input) || (a.status === Ht && e !== pt)) return $t(t, 0 === t.avail_out ? zt : vt);
    const i = a.last_flush;
    if (((a.last_flush = e), 0 !== a.pending)) {
        if ((Yt(t), 0 === t.avail_out)) return (a.last_flush = -1), yt;
    } else if (0 === t.avail_in && jt(e) <= jt(i) && e !== pt) return $t(t, zt);
    if (a.status === Ht && 0 !== t.avail_in) return $t(t, zt);
    if ((a.status === Nt && 0 === a.wrap && (a.status = Pt), a.status === Nt)) {
        let e = (Ft + ((a.w_bits - 8) << 4)) << 8,
            i = -1;
        if (
            ((i = a.strategy >= Et || a.level < 2 ? 0 : a.level < 6 ? 1 : 6 === a.level ? 2 : 3),
            (e |= i << 6),
            0 !== a.strstart && (e |= 32),
            (e += 31 - (e % 31)),
            Xt(a, e),
            0 !== a.strstart && (Xt(a, t.adler >>> 16), Xt(a, 65535 & t.adler)),
            (t.adler = 1),
            (a.status = Pt),
            Yt(t),
            0 !== a.pending)
        )
            return (a.last_flush = -1), yt;
    }
    if (57 === a.status)
        if (((t.adler = 0), Gt(a, 31), Gt(a, 139), Gt(a, 8), a.gzhead))
            Gt(a, (a.gzhead.text ? 1 : 0) + (a.gzhead.hcrc ? 2 : 0) + (a.gzhead.extra ? 4 : 0) + (a.gzhead.name ? 8 : 0) + (a.gzhead.comment ? 16 : 0)),
                Gt(a, 255 & a.gzhead.time),
                Gt(a, (a.gzhead.time >> 8) & 255),
                Gt(a, (a.gzhead.time >> 16) & 255),
                Gt(a, (a.gzhead.time >> 24) & 255),
                Gt(a, 9 === a.level ? 2 : a.strategy >= Et || a.level < 2 ? 4 : 0),
                Gt(a, 255 & a.gzhead.os),
                a.gzhead.extra && a.gzhead.extra.length && (Gt(a, 255 & a.gzhead.extra.length), Gt(a, (a.gzhead.extra.length >> 8) & 255)),
                a.gzhead.hcrc && (t.adler = ot(t.adler, a.pending_buf, a.pending, 0)),
                (a.gzindex = 0),
                (a.status = 69);
        else if ((Gt(a, 0), Gt(a, 0), Gt(a, 0), Gt(a, 0), Gt(a, 0), Gt(a, 9 === a.level ? 2 : a.strategy >= Et || a.level < 2 ? 4 : 0), Gt(a, 3), (a.status = Pt), Yt(t), 0 !== a.pending)) return (a.last_flush = -1), yt;
    if (69 === a.status) {
        if (a.gzhead.extra) {
            let e = a.pending,
                i = (65535 & a.gzhead.extra.length) - a.gzindex;
            for (; a.pending + i > a.pending_buf_size; ) {
                let s = a.pending_buf_size - a.pending;
                if (
                    (a.pending_buf.set(a.gzhead.extra.subarray(a.gzindex, a.gzindex + s), a.pending),
                    (a.pending = a.pending_buf_size),
                    a.gzhead.hcrc && a.pending > e && (t.adler = ot(t.adler, a.pending_buf, a.pending - e, e)),
                    (a.gzindex += s),
                    Yt(t),
                    0 !== a.pending)
                )
                    return (a.last_flush = -1), yt;
                (e = 0), (i -= s);
            }
            let s = new Uint8Array(a.gzhead.extra);
            a.pending_buf.set(s.subarray(a.gzindex, a.gzindex + i), a.pending), (a.pending += i), a.gzhead.hcrc && a.pending > e && (t.adler = ot(t.adler, a.pending_buf, a.pending - e, e)), (a.gzindex = 0);
        }
        a.status = 73;
    }
    if (73 === a.status) {
        if (a.gzhead.name) {
            let e,
                i = a.pending;
            do {
                if (a.pending === a.pending_buf_size) {
                    if ((a.gzhead.hcrc && a.pending > i && (t.adler = ot(t.adler, a.pending_buf, a.pending - i, i)), Yt(t), 0 !== a.pending)) return (a.last_flush = -1), yt;
                    i = 0;
                }
                (e = a.gzindex < a.gzhead.name.length ? 255 & a.gzhead.name.charCodeAt(a.gzindex++) : 0), Gt(a, e);
            } while (0 !== e);
            a.gzhead.hcrc && a.pending > i && (t.adler = ot(t.adler, a.pending_buf, a.pending - i, i)), (a.gzindex = 0);
        }
        a.status = 91;
    }
    if (91 === a.status) {
        if (a.gzhead.comment) {
            let e,
                i = a.pending;
            do {
                if (a.pending === a.pending_buf_size) {
                    if ((a.gzhead.hcrc && a.pending > i && (t.adler = ot(t.adler, a.pending_buf, a.pending - i, i)), Yt(t), 0 !== a.pending)) return (a.last_flush = -1), yt;
                    i = 0;
                }
                (e = a.gzindex < a.gzhead.comment.length ? 255 & a.gzhead.comment.charCodeAt(a.gzindex++) : 0), Gt(a, e);
            } while (0 !== e);
            a.gzhead.hcrc && a.pending > i && (t.adler = ot(t.adler, a.pending_buf, a.pending - i, i));
        }
        a.status = 103;
    }
    if (103 === a.status) {
        if (a.gzhead.hcrc) {
            if (a.pending + 2 > a.pending_buf_size && (Yt(t), 0 !== a.pending)) return (a.last_flush = -1), yt;
            Gt(a, 255 & t.adler), Gt(a, (t.adler >> 8) & 255), (t.adler = 0);
        }
        if (((a.status = Pt), Yt(t), 0 !== a.pending)) return (a.last_flush = -1), yt;
    }
    if (0 !== t.avail_in || 0 !== a.lookahead || (e !== gt && a.status !== Ht)) {
        let i =
            0 === a.level
                ? ee(a, e)
                : a.strategy === Et
                ? ((t, e) => {
                      let a;
                      for (;;) {
                          if (0 === t.lookahead && (te(t), 0 === t.lookahead)) {
                              if (e === gt) return 1;
                              break;
                          }
                          if (((t.match_length = 0), (a = ct(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++, a && (qt(t, !1), 0 === t.strm.avail_out))) return 1;
                      }
                      return (t.insert = 0), e === pt ? (qt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.sym_next && (qt(t, !1), 0 === t.strm.avail_out) ? 1 : 2;
                  })(a, e)
                : a.strategy === Rt
                ? ((t, e) => {
                      let a, i, s, r;
                      const n = t.window;
                      for (;;) {
                          if (t.lookahead <= Lt) {
                              if ((te(t), t.lookahead <= Lt && e === gt)) return 1;
                              if (0 === t.lookahead) break;
                          }
                          if (((t.match_length = 0), t.lookahead >= 3 && t.strstart > 0 && ((s = t.strstart - 1), (i = n[s]), i === n[++s] && i === n[++s] && i === n[++s]))) {
                              r = t.strstart + Lt;
                              do {} while (i === n[++s] && i === n[++s] && i === n[++s] && i === n[++s] && i === n[++s] && i === n[++s] && i === n[++s] && i === n[++s] && s < r);
                              (t.match_length = Lt - (r - s)), t.match_length > t.lookahead && (t.match_length = t.lookahead);
                          }
                          if (
                              (t.match_length >= 3
                                  ? ((a = ct(t, 1, t.match_length - 3)), (t.lookahead -= t.match_length), (t.strstart += t.match_length), (t.match_length = 0))
                                  : ((a = ct(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++),
                              a && (qt(t, !1), 0 === t.strm.avail_out))
                          )
                              return 1;
                      }
                      return (t.insert = 0), e === pt ? (qt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.sym_next && (qt(t, !1), 0 === t.strm.avail_out) ? 1 : 2;
                  })(a, e)
                : re[a.level].func(a, e);
        if (((3 !== i && 4 !== i) || (a.status = Ht), 1 === i || 3 === i)) return 0 === t.avail_out && (a.last_flush = -1), yt;
        if (2 === i && (e === wt ? ut(a) : e !== bt && (ft(a, 0, 0, !1), e === mt && (Vt(a.head), 0 === a.lookahead && ((a.strstart = 0), (a.block_start = 0), (a.insert = 0)))), Yt(t), 0 === t.avail_out)) return (a.last_flush = -1), yt;
    }
    return e !== pt
        ? yt
        : a.wrap <= 0
        ? kt
        : (2 === a.wrap
              ? (Gt(a, 255 & t.adler),
                Gt(a, (t.adler >> 8) & 255),
                Gt(a, (t.adler >> 16) & 255),
                Gt(a, (t.adler >> 24) & 255),
                Gt(a, 255 & t.total_in),
                Gt(a, (t.total_in >> 8) & 255),
                Gt(a, (t.total_in >> 16) & 255),
                Gt(a, (t.total_in >> 24) & 255))
              : (Xt(a, t.adler >>> 16), Xt(a, 65535 & t.adler)),
          Yt(t),
          a.wrap > 0 && (a.wrap = -a.wrap),
          0 !== a.pending ? yt : kt);
},
deflateEnd: (t) => {
    if (oe(t)) return vt;
    const e = t.state.status;
    return (t.state = null), e === Pt ? $t(t, xt) : yt;
},
deflateSetDictionary: (t, e) => {
    let a = e.length;
    if (oe(t)) return vt;
    const i = t.state,
        s = i.wrap;
    if (2 === s || (1 === s && i.status !== Nt) || i.lookahead) return vt;
    if ((1 === s && (t.adler = rt(t.adler, e, a, 0)), (i.wrap = 0), a >= i.w_size)) {
        0 === s && (Vt(i.head), (i.strstart = 0), (i.block_start = 0), (i.insert = 0));
        let t = new Uint8Array(i.w_size);
        t.set(e.subarray(a - i.w_size, a), 0), (e = t), (a = i.w_size);
    }
    const r = t.avail_in,
        n = t.next_in,
        o = t.input;
    for (t.avail_in = a, t.next_in = 0, t.input = e, te(i); i.lookahead >= 3; ) {
        let t = i.strstart,
            e = i.lookahead - 2;
        do {
            (i.ins_h = Kt(i, i.ins_h, i.window[t + 3 - 1])), (i.prev[t & i.w_mask] = i.head[i.ins_h]), (i.head[i.ins_h] = t), t++;
        } while (--e);
        (i.strstart = t), (i.lookahead = 2), te(i);
    }
    return (
        (i.strstart += i.lookahead),
        (i.block_start = i.strstart),
        (i.insert = i.lookahead),
        (i.lookahead = 0),
        (i.match_length = i.prev_length = 2),
        (i.match_available = 0),
        (t.next_in = n),
        (t.input = o),
        (t.avail_in = r),
        (i.wrap = s),
        yt
    );
},
deflateInfo: "pako deflate (from Nodeca project)",
};
const _e = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
var ce = {
assign: function (t) {
    const e = Array.prototype.slice.call(arguments, 1);
    for (; e.length; ) {
        const a = e.shift();
        if (a) {
            if ("object" != typeof a) throw new TypeError(a + "must be non-object");
            for (const e in a) _e(a, e) && (t[e] = a[e]);
        }
    }
    return t;
},
flattenChunks: (t) => {
    let e = 0;
    for (let a = 0, i = t.length; a < i; a++) e += t[a].length;
    const a = new Uint8Array(e);
    for (let e = 0, i = 0, s = t.length; e < s; e++) {
        let s = t[e];
        a.set(s, i), (i += s.length);
    }
    return a;
},
};
let ue = !0;
try {
String.fromCharCode.apply(null, new Uint8Array(1));
} catch (t) {
ue = !1;
}
const ge = new Uint8Array(256);
for (let t = 0; t < 256; t++) ge[t] = t >= 252 ? 6 : t >= 248 ? 5 : t >= 240 ? 4 : t >= 224 ? 3 : t >= 192 ? 2 : 1;
ge[254] = ge[254] = 1;
var we = {
string2buf: (t) => {
    if ("function" == typeof TextEncoder && TextEncoder.prototype.encode) return new TextEncoder().encode(t);
    let e,
        a,
        i,
        s,
        r,
        n = t.length,
        o = 0;
    for (s = 0; s < n; s++)
        (a = t.charCodeAt(s)), 55296 == (64512 & a) && s + 1 < n && ((i = t.charCodeAt(s + 1)), 56320 == (64512 & i) && ((a = 65536 + ((a - 55296) << 10) + (i - 56320)), s++)), (o += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4);
    for (e = new Uint8Array(o), r = 0, s = 0; r < o; s++)
        (a = t.charCodeAt(s)),
            55296 == (64512 & a) && s + 1 < n && ((i = t.charCodeAt(s + 1)), 56320 == (64512 & i) && ((a = 65536 + ((a - 55296) << 10) + (i - 56320)), s++)),
            a < 128
                ? (e[r++] = a)
                : a < 2048
                ? ((e[r++] = 192 | (a >>> 6)), (e[r++] = 128 | (63 & a)))
                : a < 65536
                ? ((e[r++] = 224 | (a >>> 12)), (e[r++] = 128 | ((a >>> 6) & 63)), (e[r++] = 128 | (63 & a)))
                : ((e[r++] = 240 | (a >>> 18)), (e[r++] = 128 | ((a >>> 12) & 63)), (e[r++] = 128 | ((a >>> 6) & 63)), (e[r++] = 128 | (63 & a)));
    return e;
},
buf2string: (t, e) => {
    const a = e || t.length;
    if ("function" == typeof TextDecoder && TextDecoder.prototype.decode) return new TextDecoder().decode(t.subarray(0, e));
    let i, s;
    const r = new Array(2 * a);
    for (s = 0, i = 0; i < a; ) {
        let e = t[i++];
        if (e < 128) {
            r[s++] = e;
            continue;
        }
        let n = ge[e];
        if (n > 4) (r[s++] = 65533), (i += n - 1);
        else {
            for (e &= 2 === n ? 31 : 3 === n ? 15 : 7; n > 1 && i < a; ) (e = (e << 6) | (63 & t[i++])), n--;
            n > 1 ? (r[s++] = 65533) : e < 65536 ? (r[s++] = e) : ((e -= 65536), (r[s++] = 55296 | ((e >> 10) & 1023)), (r[s++] = 56320 | (1023 & e)));
        }
    }
    return ((t, e) => {
        if (e < 65534 && t.subarray && ue) return String.fromCharCode.apply(null, t.length === e ? t : t.subarray(0, e));
        let a = "";
        for (let i = 0; i < e; i++) a += String.fromCharCode(t[i]);
        return a;
    })(r, s);
},
utf8border: (t, e) => {
    (e = e || t.length) > t.length && (e = t.length);
    let a = e - 1;
    for (; a >= 0 && 128 == (192 & t[a]); ) a--;
    return a < 0 || 0 === a ? e : a + ge[t[a]] > e ? a : e;
},
};
var me = function () {
(this.input = null),
    (this.next_in = 0),
    (this.avail_in = 0),
    (this.total_in = 0),
    (this.output = null),
    (this.next_out = 0),
    (this.avail_out = 0),
    (this.total_out = 0),
    (this.msg = ""),
    (this.state = null),
    (this.data_type = 2),
    (this.adler = 0);
};
const pe = Object.prototype.toString,
{ Z_NO_FLUSH: be, Z_SYNC_FLUSH: ye, Z_FULL_FLUSH: ke, Z_FINISH: ve, Z_OK: xe, Z_STREAM_END: ze, Z_DEFAULT_COMPRESSION: Se, Z_DEFAULT_STRATEGY: Ue, Z_DEFLATED: Ee } = ht;
function Re(t) {
this.options = ce.assign({ level: Se, method: Ee, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: Ue }, t || {});
let e = this.options;
e.raw && e.windowBits > 0 ? (e.windowBits = -e.windowBits) : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16),
    (this.err = 0),
    (this.msg = ""),
    (this.ended = !1),
    (this.chunks = []),
    (this.strm = new me()),
    (this.strm.avail_out = 0);
let a = fe.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
if (a !== xe) throw new Error(lt[a]);
if ((e.header && fe.deflateSetHeader(this.strm, e.header), e.dictionary)) {
    let t;
    if (((t = "string" == typeof e.dictionary ? we.string2buf(e.dictionary) : "[object ArrayBuffer]" === pe.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary), (a = fe.deflateSetDictionary(this.strm, t)), a !== xe))
        throw new Error(lt[a]);
    this._dict_set = !0;
}
}
function Ae(t, e) {
const a = new Re(e);
if ((a.push(t, !0), a.err)) throw a.msg || lt[a.err];
return a.result;
}
(Re.prototype.push = function (t, e) {
const a = this.strm,
    i = this.options.chunkSize;
let s, r;
if (this.ended) return !1;
for (r = e === ~~e ? e : !0 === e ? ve : be, "string" == typeof t ? (a.input = we.string2buf(t)) : "[object ArrayBuffer]" === pe.call(t) ? (a.input = new Uint8Array(t)) : (a.input = t), a.next_in = 0, a.avail_in = a.input.length; ; )
    if ((0 === a.avail_out && ((a.output = new Uint8Array(i)), (a.next_out = 0), (a.avail_out = i)), (r === ye || r === ke) && a.avail_out <= 6)) this.onData(a.output.subarray(0, a.next_out)), (a.avail_out = 0);
    else {
        if (((s = fe.deflate(a, r)), s === ze)) return a.next_out > 0 && this.onData(a.output.subarray(0, a.next_out)), (s = fe.deflateEnd(this.strm)), this.onEnd(s), (this.ended = !0), s === xe;
        if (0 !== a.avail_out) {
            if (r > 0 && a.next_out > 0) this.onData(a.output.subarray(0, a.next_out)), (a.avail_out = 0);
            else if (0 === a.avail_in) break;
        } else this.onData(a.output);
    }
return !0;
}),
(Re.prototype.onData = function (t) {
    this.chunks.push(t);
}),
(Re.prototype.onEnd = function (t) {
    t === xe && (this.result = ce.flattenChunks(this.chunks)), (this.chunks = []), (this.err = t), (this.msg = this.strm.msg);
});
var Ie = {
Deflate: Re,
deflate: Ae,
deflateRaw: function (t, e) {
    return ((e = e || {}).raw = !0), Ae(t, e);
},
gzip: function (t, e) {
    return ((e = e || {}).gzip = !0), Ae(t, e);
},
constants: ht,
};
const De = 16209;
var Fe = function (t, e) {
let a, i, s, r, n, o, l, h, d, f, _, c, u, g, w, m, p, b, y, k, v, x, z, S;
const U = t.state;
(a = t.next_in),
    (z = t.input),
    (i = a + (t.avail_in - 5)),
    (s = t.next_out),
    (S = t.output),
    (r = s - (e - t.avail_out)),
    (n = s + (t.avail_out - 257)),
    (o = U.dmax),
    (l = U.wsize),
    (h = U.whave),
    (d = U.wnext),
    (f = U.window),
    (_ = U.hold),
    (c = U.bits),
    (u = U.lencode),
    (g = U.distcode),
    (w = (1 << U.lenbits) - 1),
    (m = (1 << U.distbits) - 1);
t: do {
    c < 15 && ((_ += z[a++] << c), (c += 8), (_ += z[a++] << c), (c += 8)), (p = u[_ & w]);
    e: for (;;) {
        if (((b = p >>> 24), (_ >>>= b), (c -= b), (b = (p >>> 16) & 255), 0 === b)) S[s++] = 65535 & p;
        else {
            if (!(16 & b)) {
                if (0 == (64 & b)) {
                    p = u[(65535 & p) + (_ & ((1 << b) - 1))];
                    continue e;
                }
                if (32 & b) {
                    U.mode = 16191;
                    break t;
                }
                (t.msg = "invalid literal/length code"), (U.mode = De);
                break t;
            }
            (y = 65535 & p), (b &= 15), b && (c < b && ((_ += z[a++] << c), (c += 8)), (y += _ & ((1 << b) - 1)), (_ >>>= b), (c -= b)), c < 15 && ((_ += z[a++] << c), (c += 8), (_ += z[a++] << c), (c += 8)), (p = g[_ & m]);
            a: for (;;) {
                if (((b = p >>> 24), (_ >>>= b), (c -= b), (b = (p >>> 16) & 255), !(16 & b))) {
                    if (0 == (64 & b)) {
                        p = g[(65535 & p) + (_ & ((1 << b) - 1))];
                        continue a;
                    }
                    (t.msg = "invalid distance code"), (U.mode = De);
                    break t;
                }
                if (((k = 65535 & p), (b &= 15), c < b && ((_ += z[a++] << c), (c += 8), c < b && ((_ += z[a++] << c), (c += 8))), (k += _ & ((1 << b) - 1)), k > o)) {
                    (t.msg = "invalid distance too far back"), (U.mode = De);
                    break t;
                }
                if (((_ >>>= b), (c -= b), (b = s - r), k > b)) {
                    if (((b = k - b), b > h && U.sane)) {
                        (t.msg = "invalid distance too far back"), (U.mode = De);
                        break t;
                    }
                    if (((v = 0), (x = f), 0 === d)) {
                        if (((v += l - b), b < y)) {
                            y -= b;
                            do {
                                S[s++] = f[v++];
                            } while (--b);
                            (v = s - k), (x = S);
                        }
                    } else if (d < b) {
                        if (((v += l + d - b), (b -= d), b < y)) {
                            y -= b;
                            do {
                                S[s++] = f[v++];
                            } while (--b);
                            if (((v = 0), d < y)) {
                                (b = d), (y -= b);
                                do {
                                    S[s++] = f[v++];
                                } while (--b);
                                (v = s - k), (x = S);
                            }
                        }
                    } else if (((v += d - b), b < y)) {
                        y -= b;
                        do {
                            S[s++] = f[v++];
                        } while (--b);
                        (v = s - k), (x = S);
                    }
                    for (; y > 2; ) (S[s++] = x[v++]), (S[s++] = x[v++]), (S[s++] = x[v++]), (y -= 3);
                    y && ((S[s++] = x[v++]), y > 1 && (S[s++] = x[v++]));
                } else {
                    v = s - k;
                    do {
                        (S[s++] = S[v++]), (S[s++] = S[v++]), (S[s++] = S[v++]), (y -= 3);
                    } while (y > 2);
                    y && ((S[s++] = S[v++]), y > 1 && (S[s++] = S[v++]));
                }
                break;
            }
        }
        break;
    }
} while (a < i && s < n);
(y = c >> 3), (a -= y), (c -= y << 3), (_ &= (1 << c) - 1), (t.next_in = a), (t.next_out = s), (t.avail_in = a < i ? i - a + 5 : 5 - (a - i)), (t.avail_out = s < n ? n - s + 257 : 257 - (s - n)), (U.hold = _), (U.bits = c);
};
const Be = 15,
Oe = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]),
Ce = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]),
Te = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]),
Ze = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);
var Le = (t, e, a, i, s, r, n, o) => {
const l = o.bits;
let h,
    d,
    f,
    _,
    c,
    u,
    g = 0,
    w = 0,
    m = 0,
    p = 0,
    b = 0,
    y = 0,
    k = 0,
    v = 0,
    x = 0,
    z = 0,
    S = null;
const U = new Uint16Array(16),
    E = new Uint16Array(16);
let R,
    A,
    I,
    D = null;
for (g = 0; g <= Be; g++) U[g] = 0;
for (w = 0; w < i; w++) U[e[a + w]]++;
for (b = l, p = Be; p >= 1 && 0 === U[p]; p--);
if ((b > p && (b = p), 0 === p)) return (s[r++] = 20971520), (s[r++] = 20971520), (o.bits = 1), 0;
for (m = 1; m < p && 0 === U[m]; m++);
for (b < m && (b = m), v = 1, g = 1; g <= Be; g++) if (((v <<= 1), (v -= U[g]), v < 0)) return -1;
if (v > 0 && (0 === t || 1 !== p)) return -1;
for (E[1] = 0, g = 1; g < Be; g++) E[g + 1] = E[g] + U[g];
for (w = 0; w < i; w++) 0 !== e[a + w] && (n[E[e[a + w]]++] = w);
if (
    (0 === t ? ((S = D = n), (u = 20)) : 1 === t ? ((S = Oe), (D = Ce), (u = 257)) : ((S = Te), (D = Ze), (u = 0)),
    (z = 0),
    (w = 0),
    (g = m),
    (c = r),
    (y = b),
    (k = 0),
    (f = -1),
    (x = 1 << b),
    (_ = x - 1),
    (1 === t && x > 852) || (2 === t && x > 592))
)
    return 1;
for (;;) {
    (R = g - k), n[w] + 1 < u ? ((A = 0), (I = n[w])) : n[w] >= u ? ((A = D[n[w] - u]), (I = S[n[w] - u])) : ((A = 96), (I = 0)), (h = 1 << (g - k)), (d = 1 << y), (m = d);
    do {
        (d -= h), (s[c + (z >> k) + d] = (R << 24) | (A << 16) | I | 0);
    } while (0 !== d);
    for (h = 1 << (g - 1); z & h; ) h >>= 1;
    if ((0 !== h ? ((z &= h - 1), (z += h)) : (z = 0), w++, 0 == --U[g])) {
        if (g === p) break;
        g = e[a + n[w]];
    }
    if (g > b && (z & _) !== f) {
        for (0 === k && (k = b), c += m, y = g - k, v = 1 << y; y + k < p && ((v -= U[y + k]), !(v <= 0)); ) y++, (v <<= 1);
        if (((x += 1 << y), (1 === t && x > 852) || (2 === t && x > 592))) return 1;
        (f = z & _), (s[f] = (b << 24) | (y << 16) | (c - r) | 0);
    }
}
return 0 !== z && (s[c + z] = ((g - k) << 24) | (64 << 16) | 0), (o.bits = b), 0;
};
const { Z_FINISH: Me, Z_BLOCK: Ne, Z_TREES: Pe, Z_OK: He, Z_STREAM_END: $e, Z_NEED_DICT: je, Z_STREAM_ERROR: Ve, Z_DATA_ERROR: We, Z_MEM_ERROR: Ke, Z_BUF_ERROR: Ye, Z_DEFLATED: qe } = ht,
Ge = 16180,
Xe = 16190,
Qe = 16191,
Je = 16192,
ta = 16194,
ea = 16199,
aa = 16200,
ia = 16206,
sa = 16209,
ra = (t) => ((t >>> 24) & 255) + ((t >>> 8) & 65280) + ((65280 & t) << 8) + ((255 & t) << 24);
function na() {
(this.strm = null),
    (this.mode = 0),
    (this.last = !1),
    (this.wrap = 0),
    (this.havedict = !1),
    (this.flags = 0),
    (this.dmax = 0),
    (this.check = 0),
    (this.total = 0),
    (this.head = null),
    (this.wbits = 0),
    (this.wsize = 0),
    (this.whave = 0),
    (this.wnext = 0),
    (this.window = null),
    (this.hold = 0),
    (this.bits = 0),
    (this.length = 0),
    (this.offset = 0),
    (this.extra = 0),
    (this.lencode = null),
    (this.distcode = null),
    (this.lenbits = 0),
    (this.distbits = 0),
    (this.ncode = 0),
    (this.nlen = 0),
    (this.ndist = 0),
    (this.have = 0),
    (this.next = null),
    (this.lens = new Uint16Array(320)),
    (this.work = new Uint16Array(288)),
    (this.lendyn = null),
    (this.distdyn = null),
    (this.sane = 0),
    (this.back = 0),
    (this.was = 0);
}
const oa = (t) => {
    if (!t) return 1;
    const e = t.state;
    return !e || e.strm !== t || e.mode < Ge || e.mode > 16211 ? 1 : 0;
},
la = (t) => {
    if (oa(t)) return Ve;
    const e = t.state;
    return (
        (t.total_in = t.total_out = e.total = 0),
        (t.msg = ""),
        e.wrap && (t.adler = 1 & e.wrap),
        (e.mode = Ge),
        (e.last = 0),
        (e.havedict = 0),
        (e.flags = -1),
        (e.dmax = 32768),
        (e.head = null),
        (e.hold = 0),
        (e.bits = 0),
        (e.lencode = e.lendyn = new Int32Array(852)),
        (e.distcode = e.distdyn = new Int32Array(592)),
        (e.sane = 1),
        (e.back = -1),
        He
    );
},
ha = (t) => {
    if (oa(t)) return Ve;
    const e = t.state;
    return (e.wsize = 0), (e.whave = 0), (e.wnext = 0), la(t);
},
da = (t, e) => {
    let a;
    if (oa(t)) return Ve;
    const i = t.state;
    return e < 0 ? ((a = 0), (e = -e)) : ((a = 5 + (e >> 4)), e < 48 && (e &= 15)), e && (e < 8 || e > 15) ? Ve : (null !== i.window && i.wbits !== e && (i.window = null), (i.wrap = a), (i.wbits = e), ha(t));
},
fa = (t, e) => {
    if (!t) return Ve;
    const a = new na();
    (t.state = a), (a.strm = t), (a.window = null), (a.mode = Ge);
    const i = da(t, e);
    return i !== He && (t.state = null), i;
};
let _a,
ca,
ua = !0;
const ga = (t) => {
    if (ua) {
        (_a = new Int32Array(512)), (ca = new Int32Array(32));
        let e = 0;
        for (; e < 144; ) t.lens[e++] = 8;
        for (; e < 256; ) t.lens[e++] = 9;
        for (; e < 280; ) t.lens[e++] = 7;
        for (; e < 288; ) t.lens[e++] = 8;
        for (Le(1, t.lens, 0, 288, _a, 0, t.work, { bits: 9 }), e = 0; e < 32; ) t.lens[e++] = 5;
        Le(2, t.lens, 0, 32, ca, 0, t.work, { bits: 5 }), (ua = !1);
    }
    (t.lencode = _a), (t.lenbits = 9), (t.distcode = ca), (t.distbits = 5);
},
wa = (t, e, a, i) => {
    let s;
    const r = t.state;
    return (
        null === r.window && ((r.wsize = 1 << r.wbits), (r.wnext = 0), (r.whave = 0), (r.window = new Uint8Array(r.wsize))),
        i >= r.wsize
            ? (r.window.set(e.subarray(a - r.wsize, a), 0), (r.wnext = 0), (r.whave = r.wsize))
            : ((s = r.wsize - r.wnext),
              s > i && (s = i),
              r.window.set(e.subarray(a - i, a - i + s), r.wnext),
              (i -= s) ? (r.window.set(e.subarray(a - i, a), 0), (r.wnext = i), (r.whave = r.wsize)) : ((r.wnext += s), r.wnext === r.wsize && (r.wnext = 0), r.whave < r.wsize && (r.whave += s))),
        0
    );
};
var ma = {
inflateReset: ha,
inflateReset2: da,
inflateResetKeep: la,
inflateInit: (t) => fa(t, 15),
inflateInit2: fa,
inflate: (t, e) => {
    let a,
        i,
        s,
        r,
        n,
        o,
        l,
        h,
        d,
        f,
        _,
        c,
        u,
        g,
        w,
        m,
        p,
        b,
        y,
        k,
        v,
        x,
        z = 0;
    const S = new Uint8Array(4);
    let U, E;
    const R = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    if (oa(t) || !t.output || (!t.input && 0 !== t.avail_in)) return Ve;
    (a = t.state), a.mode === Qe && (a.mode = Je), (n = t.next_out), (s = t.output), (l = t.avail_out), (r = t.next_in), (i = t.input), (o = t.avail_in), (h = a.hold), (d = a.bits), (f = o), (_ = l), (x = He);
    t: for (;;)
        switch (a.mode) {
            case Ge:
                if (0 === a.wrap) {
                    a.mode = Je;
                    break;
                }
                for (; d < 16; ) {
                    if (0 === o) break t;
                    o--, (h += i[r++] << d), (d += 8);
                }
                if (2 & a.wrap && 35615 === h) {
                    0 === a.wbits && (a.wbits = 15), (a.check = 0), (S[0] = 255 & h), (S[1] = (h >>> 8) & 255), (a.check = ot(a.check, S, 2, 0)), (h = 0), (d = 0), (a.mode = 16181);
                    break;
                }
                if ((a.head && (a.head.done = !1), !(1 & a.wrap) || (((255 & h) << 8) + (h >> 8)) % 31)) {
                    (t.msg = "incorrect header check"), (a.mode = sa);
                    break;
                }
                if ((15 & h) !== qe) {
                    (t.msg = "unknown compression method"), (a.mode = sa);
                    break;
                }
                if (((h >>>= 4), (d -= 4), (v = 8 + (15 & h)), 0 === a.wbits && (a.wbits = v), v > 15 || v > a.wbits)) {
                    (t.msg = "invalid window size"), (a.mode = sa);
                    break;
                }
                (a.dmax = 1 << a.wbits), (a.flags = 0), (t.adler = a.check = 1), (a.mode = 512 & h ? 16189 : Qe), (h = 0), (d = 0);
                break;
            case 16181:
                for (; d < 16; ) {
                    if (0 === o) break t;
                    o--, (h += i[r++] << d), (d += 8);
                }
                if (((a.flags = h), (255 & a.flags) !== qe)) {
                    (t.msg = "unknown compression method"), (a.mode = sa);
                    break;
                }
                if (57344 & a.flags) {
                    (t.msg = "unknown header flags set"), (a.mode = sa);
                    break;
                }
                a.head && (a.head.text = (h >> 8) & 1), 512 & a.flags && 4 & a.wrap && ((S[0] = 255 & h), (S[1] = (h >>> 8) & 255), (a.check = ot(a.check, S, 2, 0))), (h = 0), (d = 0), (a.mode = 16182);
            case 16182:
                for (; d < 32; ) {
                    if (0 === o) break t;
                    o--, (h += i[r++] << d), (d += 8);
                }
                a.head && (a.head.time = h),
                    512 & a.flags && 4 & a.wrap && ((S[0] = 255 & h), (S[1] = (h >>> 8) & 255), (S[2] = (h >>> 16) & 255), (S[3] = (h >>> 24) & 255), (a.check = ot(a.check, S, 4, 0))),
                    (h = 0),
                    (d = 0),
                    (a.mode = 16183);
            case 16183:
                for (; d < 16; ) {
                    if (0 === o) break t;
                    o--, (h += i[r++] << d), (d += 8);
                }
                a.head && ((a.head.xflags = 255 & h), (a.head.os = h >> 8)), 512 & a.flags && 4 & a.wrap && ((S[0] = 255 & h), (S[1] = (h >>> 8) & 255), (a.check = ot(a.check, S, 2, 0))), (h = 0), (d = 0), (a.mode = 16184);
            case 16184:
                if (1024 & a.flags) {
                    for (; d < 16; ) {
                        if (0 === o) break t;
                        o--, (h += i[r++] << d), (d += 8);
                    }
                    (a.length = h), a.head && (a.head.extra_len = h), 512 & a.flags && 4 & a.wrap && ((S[0] = 255 & h), (S[1] = (h >>> 8) & 255), (a.check = ot(a.check, S, 2, 0))), (h = 0), (d = 0);
                } else a.head && (a.head.extra = null);
                a.mode = 16185;
            case 16185:
                if (
                    1024 & a.flags &&
                    ((c = a.length),
                    c > o && (c = o),
                    c &&
                        (a.head && ((v = a.head.extra_len - a.length), a.head.extra || (a.head.extra = new Uint8Array(a.head.extra_len)), a.head.extra.set(i.subarray(r, r + c), v)),
                        512 & a.flags && 4 & a.wrap && (a.check = ot(a.check, i, c, r)),
                        (o -= c),
                        (r += c),
                        (a.length -= c)),
                    a.length)
                )
                    break t;
                (a.length = 0), (a.mode = 16186);
            case 16186:
                if (2048 & a.flags) {
                    if (0 === o) break t;
                    c = 0;
                    do {
                        (v = i[r + c++]), a.head && v && a.length < 65536 && (a.head.name += String.fromCharCode(v));
                    } while (v && c < o);
                    if ((512 & a.flags && 4 & a.wrap && (a.check = ot(a.check, i, c, r)), (o -= c), (r += c), v)) break t;
                } else a.head && (a.head.name = null);
                (a.length = 0), (a.mode = 16187);
            case 16187:
                if (4096 & a.flags) {
                    if (0 === o) break t;
                    c = 0;
                    do {
                        (v = i[r + c++]), a.head && v && a.length < 65536 && (a.head.comment += String.fromCharCode(v));
                    } while (v && c < o);
                    if ((512 & a.flags && 4 & a.wrap && (a.check = ot(a.check, i, c, r)), (o -= c), (r += c), v)) break t;
                } else a.head && (a.head.comment = null);
                a.mode = 16188;
            case 16188:
                if (512 & a.flags) {
                    for (; d < 16; ) {
                        if (0 === o) break t;
                        o--, (h += i[r++] << d), (d += 8);
                    }
                    if (4 & a.wrap && h !== (65535 & a.check)) {
                        (t.msg = "header crc mismatch"), (a.mode = sa);
                        break;
                    }
                    (h = 0), (d = 0);
                }
                a.head && ((a.head.hcrc = (a.flags >> 9) & 1), (a.head.done = !0)), (t.adler = a.check = 0), (a.mode = Qe);
                break;
            case 16189:
                for (; d < 32; ) {
                    if (0 === o) break t;
                    o--, (h += i[r++] << d), (d += 8);
                }
                (t.adler = a.check = ra(h)), (h = 0), (d = 0), (a.mode = Xe);
            case Xe:
                if (0 === a.havedict) return (t.next_out = n), (t.avail_out = l), (t.next_in = r), (t.avail_in = o), (a.hold = h), (a.bits = d), je;
                (t.adler = a.check = 1), (a.mode = Qe);
            case Qe:
                if (e === Ne || e === Pe) break t;
            case Je:
                if (a.last) {
                    (h >>>= 7 & d), (d -= 7 & d), (a.mode = ia);
                    break;
                }
                for (; d < 3; ) {
                    if (0 === o) break t;
                    o--, (h += i[r++] << d), (d += 8);
                }
                switch (((a.last = 1 & h), (h >>>= 1), (d -= 1), 3 & h)) {
                    case 0:
                        a.mode = 16193;
                        break;
                    case 1:
                        if ((ga(a), (a.mode = ea), e === Pe)) {
                            (h >>>= 2), (d -= 2);
                            break t;
                        }
                        break;
                    case 2:
                        a.mode = 16196;
                        break;
                    case 3:
                        (t.msg = "invalid block type"), (a.mode = sa);
                }
                (h >>>= 2), (d -= 2);
                break;
            case 16193:
                for (h >>>= 7 & d, d -= 7 & d; d < 32; ) {
                    if (0 === o) break t;
                    o--, (h += i[r++] << d), (d += 8);
                }
                if ((65535 & h) != ((h >>> 16) ^ 65535)) {
                    (t.msg = "invalid stored block lengths"), (a.mode = sa);
                    break;
                }
                if (((a.length = 65535 & h), (h = 0), (d = 0), (a.mode = ta), e === Pe)) break t;
            case ta:
                a.mode = 16195;
            case 16195:
                if (((c = a.length), c)) {
                    if ((c > o && (c = o), c > l && (c = l), 0 === c)) break t;
                    s.set(i.subarray(r, r + c), n), (o -= c), (r += c), (l -= c), (n += c), (a.length -= c);
                    break;
                }
                a.mode = Qe;
                break;
            case 16196:
                for (; d < 14; ) {
                    if (0 === o) break t;
                    o--, (h += i[r++] << d), (d += 8);
                }
                if (((a.nlen = 257 + (31 & h)), (h >>>= 5), (d -= 5), (a.ndist = 1 + (31 & h)), (h >>>= 5), (d -= 5), (a.ncode = 4 + (15 & h)), (h >>>= 4), (d -= 4), a.nlen > 286 || a.ndist > 30)) {
                    (t.msg = "too many length or distance symbols"), (a.mode = sa);
                    break;
                }
                (a.have = 0), (a.mode = 16197);
            case 16197:
                for (; a.have < a.ncode; ) {
                    for (; d < 3; ) {
                        if (0 === o) break t;
                        o--, (h += i[r++] << d), (d += 8);
                    }
                    (a.lens[R[a.have++]] = 7 & h), (h >>>= 3), (d -= 3);
                }
                for (; a.have < 19; ) a.lens[R[a.have++]] = 0;
                if (((a.lencode = a.lendyn), (a.lenbits = 7), (U = { bits: a.lenbits }), (x = Le(0, a.lens, 0, 19, a.lencode, 0, a.work, U)), (a.lenbits = U.bits), x)) {
                    (t.msg = "invalid code lengths set"), (a.mode = sa);
                    break;
                }
                (a.have = 0), (a.mode = 16198);
            case 16198:
                for (; a.have < a.nlen + a.ndist; ) {
                    for (; (z = a.lencode[h & ((1 << a.lenbits) - 1)]), (w = z >>> 24), (m = (z >>> 16) & 255), (p = 65535 & z), !(w <= d); ) {
                        if (0 === o) break t;
                        o--, (h += i[r++] << d), (d += 8);
                    }
                    if (p < 16) (h >>>= w), (d -= w), (a.lens[a.have++] = p);
                    else {
                        if (16 === p) {
                            for (E = w + 2; d < E; ) {
                                if (0 === o) break t;
                                o--, (h += i[r++] << d), (d += 8);
                            }
                            if (((h >>>= w), (d -= w), 0 === a.have)) {
                                (t.msg = "invalid bit length repeat"), (a.mode = sa);
                                break;
                            }
                            (v = a.lens[a.have - 1]), (c = 3 + (3 & h)), (h >>>= 2), (d -= 2);
                        } else if (17 === p) {
                            for (E = w + 3; d < E; ) {
                                if (0 === o) break t;
                                o--, (h += i[r++] << d), (d += 8);
                            }
                            (h >>>= w), (d -= w), (v = 0), (c = 3 + (7 & h)), (h >>>= 3), (d -= 3);
                        } else {
                            for (E = w + 7; d < E; ) {
                                if (0 === o) break t;
                                o--, (h += i[r++] << d), (d += 8);
                            }
                            (h >>>= w), (d -= w), (v = 0), (c = 11 + (127 & h)), (h >>>= 7), (d -= 7);
                        }
                        if (a.have + c > a.nlen + a.ndist) {
                            (t.msg = "invalid bit length repeat"), (a.mode = sa);
                            break;
                        }
                        for (; c--; ) a.lens[a.have++] = v;
                    }
                }
                if (a.mode === sa) break;
                if (0 === a.lens[256]) {
                    (t.msg = "invalid code -- missing end-of-block"), (a.mode = sa);
                    break;
                }
                if (((a.lenbits = 9), (U = { bits: a.lenbits }), (x = Le(1, a.lens, 0, a.nlen, a.lencode, 0, a.work, U)), (a.lenbits = U.bits), x)) {
                    (t.msg = "invalid literal/lengths set"), (a.mode = sa);
                    break;
                }
                if (((a.distbits = 6), (a.distcode = a.distdyn), (U = { bits: a.distbits }), (x = Le(2, a.lens, a.nlen, a.ndist, a.distcode, 0, a.work, U)), (a.distbits = U.bits), x)) {
                    (t.msg = "invalid distances set"), (a.mode = sa);
                    break;
                }
                if (((a.mode = ea), e === Pe)) break t;
            case ea:
                a.mode = aa;
            case aa:
                if (o >= 6 && l >= 258) {
                    (t.next_out = n),
                        (t.avail_out = l),
                        (t.next_in = r),
                        (t.avail_in = o),
                        (a.hold = h),
                        (a.bits = d),
                        Fe(t, _),
                        (n = t.next_out),
                        (s = t.output),
                        (l = t.avail_out),
                        (r = t.next_in),
                        (i = t.input),
                        (o = t.avail_in),
                        (h = a.hold),
                        (d = a.bits),
                        a.mode === Qe && (a.back = -1);
                    break;
                }
                for (a.back = 0; (z = a.lencode[h & ((1 << a.lenbits) - 1)]), (w = z >>> 24), (m = (z >>> 16) & 255), (p = 65535 & z), !(w <= d); ) {
                    if (0 === o) break t;
                    o--, (h += i[r++] << d), (d += 8);
                }
                if (m && 0 == (240 & m)) {
                    for (b = w, y = m, k = p; (z = a.lencode[k + ((h & ((1 << (b + y)) - 1)) >> b)]), (w = z >>> 24), (m = (z >>> 16) & 255), (p = 65535 & z), !(b + w <= d); ) {
                        if (0 === o) break t;
                        o--, (h += i[r++] << d), (d += 8);
                    }
                    (h >>>= b), (d -= b), (a.back += b);
                }
                if (((h >>>= w), (d -= w), (a.back += w), (a.length = p), 0 === m)) {
                    a.mode = 16205;
                    break;
                }
                if (32 & m) {
                    (a.back = -1), (a.mode = Qe);
                    break;
                }
                if (64 & m) {
                    (t.msg = "invalid literal/length code"), (a.mode = sa);
                    break;
                }
                (a.extra = 15 & m), (a.mode = 16201);
            case 16201:
                if (a.extra) {
                    for (E = a.extra; d < E; ) {
                        if (0 === o) break t;
                        o--, (h += i[r++] << d), (d += 8);
                    }
                    (a.length += h & ((1 << a.extra) - 1)), (h >>>= a.extra), (d -= a.extra), (a.back += a.extra);
                }
                (a.was = a.length), (a.mode = 16202);
            case 16202:
                for (; (z = a.distcode[h & ((1 << a.distbits) - 1)]), (w = z >>> 24), (m = (z >>> 16) & 255), (p = 65535 & z), !(w <= d); ) {
                    if (0 === o) break t;
                    o--, (h += i[r++] << d), (d += 8);
                }
                if (0 == (240 & m)) {
                    for (b = w, y = m, k = p; (z = a.distcode[k + ((h & ((1 << (b + y)) - 1)) >> b)]), (w = z >>> 24), (m = (z >>> 16) & 255), (p = 65535 & z), !(b + w <= d); ) {
                        if (0 === o) break t;
                        o--, (h += i[r++] << d), (d += 8);
                    }
                    (h >>>= b), (d -= b), (a.back += b);
                }
                if (((h >>>= w), (d -= w), (a.back += w), 64 & m)) {
                    (t.msg = "invalid distance code"), (a.mode = sa);
                    break;
                }
                (a.offset = p), (a.extra = 15 & m), (a.mode = 16203);
            case 16203:
                if (a.extra) {
                    for (E = a.extra; d < E; ) {
                        if (0 === o) break t;
                        o--, (h += i[r++] << d), (d += 8);
                    }
                    (a.offset += h & ((1 << a.extra) - 1)), (h >>>= a.extra), (d -= a.extra), (a.back += a.extra);
                }
                if (a.offset > a.dmax) {
                    (t.msg = "invalid distance too far back"), (a.mode = sa);
                    break;
                }
                a.mode = 16204;
            case 16204:
                if (0 === l) break t;
                if (((c = _ - l), a.offset > c)) {
                    if (((c = a.offset - c), c > a.whave && a.sane)) {
                        (t.msg = "invalid distance too far back"), (a.mode = sa);
                        break;
                    }
                    c > a.wnext ? ((c -= a.wnext), (u = a.wsize - c)) : (u = a.wnext - c), c > a.length && (c = a.length), (g = a.window);
                } else (g = s), (u = n - a.offset), (c = a.length);
                c > l && (c = l), (l -= c), (a.length -= c);
                do {
                    s[n++] = g[u++];
                } while (--c);
                0 === a.length && (a.mode = aa);
                break;
            case 16205:
                if (0 === l) break t;
                (s[n++] = a.length), l--, (a.mode = aa);
                break;
            case ia:
                if (a.wrap) {
                    for (; d < 32; ) {
                        if (0 === o) break t;
                        o--, (h |= i[r++] << d), (d += 8);
                    }
                    if (((_ -= l), (t.total_out += _), (a.total += _), 4 & a.wrap && _ && (t.adler = a.check = a.flags ? ot(a.check, s, _, n - _) : rt(a.check, s, _, n - _)), (_ = l), 4 & a.wrap && (a.flags ? h : ra(h)) !== a.check)) {
                        (t.msg = "incorrect data check"), (a.mode = sa);
                        break;
                    }
                    (h = 0), (d = 0);
                }
                a.mode = 16207;
            case 16207:
                if (a.wrap && a.flags) {
                    for (; d < 32; ) {
                        if (0 === o) break t;
                        o--, (h += i[r++] << d), (d += 8);
                    }
                    if (4 & a.wrap && h !== (4294967295 & a.total)) {
                        (t.msg = "incorrect length check"), (a.mode = sa);
                        break;
                    }
                    (h = 0), (d = 0);
                }
                a.mode = 16208;
            case 16208:
                x = $e;
                break t;
            case sa:
                x = We;
                break t;
            case 16210:
                return Ke;
            default:
                return Ve;
        }
    return (
        (t.next_out = n),
        (t.avail_out = l),
        (t.next_in = r),
        (t.avail_in = o),
        (a.hold = h),
        (a.bits = d),
        (a.wsize || (_ !== t.avail_out && a.mode < sa && (a.mode < ia || e !== Me))) && wa(t, t.output, t.next_out, _ - t.avail_out),
        (f -= t.avail_in),
        (_ -= t.avail_out),
        (t.total_in += f),
        (t.total_out += _),
        (a.total += _),
        4 & a.wrap && _ && (t.adler = a.check = a.flags ? ot(a.check, s, _, t.next_out - _) : rt(a.check, s, _, t.next_out - _)),
        (t.data_type = a.bits + (a.last ? 64 : 0) + (a.mode === Qe ? 128 : 0) + (a.mode === ea || a.mode === ta ? 256 : 0)),
        ((0 === f && 0 === _) || e === Me) && x === He && (x = Ye),
        x
    );
},
inflateEnd: (t) => {
    if (oa(t)) return Ve;
    let e = t.state;
    return e.window && (e.window = null), (t.state = null), He;
},
inflateGetHeader: (t, e) => {
    if (oa(t)) return Ve;
    const a = t.state;
    return 0 == (2 & a.wrap) ? Ve : ((a.head = e), (e.done = !1), He);
},
inflateSetDictionary: (t, e) => {
    const a = e.length;
    let i, s, r;
    return oa(t) ? Ve : ((i = t.state), 0 !== i.wrap && i.mode !== Xe ? Ve : i.mode === Xe && ((s = 1), (s = rt(s, e, a, 0)), s !== i.check) ? We : ((r = wa(t, e, a, a)), r ? ((i.mode = 16210), Ke) : ((i.havedict = 1), He)));
},
inflateInfo: "pako inflate (from Nodeca project)",
};
var pa = function () {
(this.text = 0), (this.time = 0), (this.xflags = 0), (this.os = 0), (this.extra = null), (this.extra_len = 0), (this.name = ""), (this.comment = ""), (this.hcrc = 0), (this.done = !1);
};
const ba = Object.prototype.toString,
{ Z_NO_FLUSH: ya, Z_FINISH: ka, Z_OK: va, Z_STREAM_END: xa, Z_NEED_DICT: za, Z_STREAM_ERROR: Sa, Z_DATA_ERROR: Ua, Z_MEM_ERROR: Ea } = ht;
function Ra(t) {
this.options = ce.assign({ chunkSize: 65536, windowBits: 15, to: "" }, t || {});
const e = this.options;
e.raw && e.windowBits >= 0 && e.windowBits < 16 && ((e.windowBits = -e.windowBits), 0 === e.windowBits && (e.windowBits = -15)),
    !(e.windowBits >= 0 && e.windowBits < 16) || (t && t.windowBits) || (e.windowBits += 32),
    e.windowBits > 15 && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15),
    (this.err = 0),
    (this.msg = ""),
    (this.ended = !1),
    (this.chunks = []),
    (this.strm = new me()),
    (this.strm.avail_out = 0);
let a = ma.inflateInit2(this.strm, e.windowBits);
if (a !== va) throw new Error(lt[a]);
if (
    ((this.header = new pa()),
    ma.inflateGetHeader(this.strm, this.header),
    e.dictionary &&
        ("string" == typeof e.dictionary ? (e.dictionary = we.string2buf(e.dictionary)) : "[object ArrayBuffer]" === ba.call(e.dictionary) && (e.dictionary = new Uint8Array(e.dictionary)),
        e.raw && ((a = ma.inflateSetDictionary(this.strm, e.dictionary)), a !== va)))
)
    throw new Error(lt[a]);
}
(Ra.prototype.push = function (t, e) {
const a = this.strm,
    i = this.options.chunkSize,
    s = this.options.dictionary;
let r, n, o;
if (this.ended) return !1;
for (n = e === ~~e ? e : !0 === e ? ka : ya, "[object ArrayBuffer]" === ba.call(t) ? (a.input = new Uint8Array(t)) : (a.input = t), a.next_in = 0, a.avail_in = a.input.length; ; ) {
    for (
        0 === a.avail_out && ((a.output = new Uint8Array(i)), (a.next_out = 0), (a.avail_out = i)), r = ma.inflate(a, n), r === za && s && ((r = ma.inflateSetDictionary(a, s)), r === va ? (r = ma.inflate(a, n)) : r === Ua && (r = za));
        a.avail_in > 0 && r === xa && a.state.wrap > 0 && 0 !== t[a.next_in];

    )
        ma.inflateReset(a), (r = ma.inflate(a, n));
    switch (r) {
        case Sa:
        case Ua:
        case za:
        case Ea:
            return this.onEnd(r), (this.ended = !0), !1;
    }
    if (((o = a.avail_out), a.next_out && (0 === a.avail_out || r === xa)))
        if ("string" === this.options.to) {
            let t = we.utf8border(a.output, a.next_out),
                e = a.next_out - t,
                s = we.buf2string(a.output, t);
            (a.next_out = e), (a.avail_out = i - e), e && a.output.set(a.output.subarray(t, t + e), 0), this.onData(s);
        } else this.onData(a.output.length === a.next_out ? a.output : a.output.subarray(0, a.next_out));
    if (r !== va || 0 !== o) {
        if (r === xa) return (r = ma.inflateEnd(this.strm)), this.onEnd(r), (this.ended = !0), !0;
        if (0 === a.avail_in) break;
    }
}
return !0;
}),
(Ra.prototype.onData = function (t) {
    this.chunks.push(t);
}),
(Ra.prototype.onEnd = function (t) {
    t === va && ("string" === this.options.to ? (this.result = this.chunks.join("")) : (this.result = ce.flattenChunks(this.chunks))), (this.chunks = []), (this.err = t), (this.msg = this.strm.msg);
});
const { Deflate: Aa, deflate: Ia, deflateRaw: Da, gzip: Fa } = Ie;
var Ba = Ia;
const Oa = {
    b: { u: DataView.prototype.getInt8, p: DataView.prototype.setInt8, bytes: 1 },
    B: { u: DataView.prototype.getUint8, p: DataView.prototype.setUint8, bytes: 1 },
    h: { u: DataView.prototype.getInt16, p: DataView.prototype.setInt16, bytes: 2 },
    H: { u: DataView.prototype.getUint16, p: DataView.prototype.setUint16, bytes: 2 },
    i: { u: DataView.prototype.getInt32, p: DataView.prototype.setInt32, bytes: 4 },
    I: { u: DataView.prototype.getUint32, p: DataView.prototype.setUint32, bytes: 4 },
    q: { u: DataView.prototype.getInt64, p: DataView.prototype.setInt64, bytes: 8 },
    Q: { u: DataView.prototype.getUint64, p: DataView.prototype.setUint64, bytes: 8 },
},
Ca = (t, ...e) => {
    let a = 0;
    if (t.replace(/[<>]/, "").length != e.length) throw "Pack format to Argument count mismatch";
    let i = [],
        s = !0;
    for (let i = 0; i < t.length; i++) "<" == t[i] ? (s = !0) : ">" == t[i] ? (s = !1) : (r(t[i], e[a]), a++);
    function r(t, e) {
        if (!(t in Oa)) throw "Unhandled character '" + t + "' in pack format";
        let a = Oa[t].bytes,
            r = new DataView(new ArrayBuffer(a));
        Oa[t].p.bind(r)(0, e, s);
        for (let t = 0; t < a; t++) i.push(r.getUint8(t));
    }
    return i;
},
Ta = (t, e) => {
    let a = 0,
        i = [],
        s = !0;
    for (let e of t) "<" == e ? (s = !0) : ">" == e ? (s = !1) : r(e);
    function r(t) {
        if (!(t in Oa)) throw "Unhandled character '" + t + "' in unpack format";
        let r = Oa[t].bytes,
            n = new DataView(new ArrayBuffer(r));
        for (let t = 0; t < r; t++) n.setUint8(t, 255 & e[a + t]);
        let o = Oa[t].u.bind(n);
        i.push(o(0, s)), (a += r);
    }
    return i;
};
class Za extends EventTarget {
constructor(t, e, a) {
    super(),
        (this.port = t),
        (this.logger = e),
        (this._parent = a),
        (this.chipName = null),
        (this._efuses = new Array(4).fill(0)),
        (this._flashsize = 4194304),
        (this.debug = !1),
        (this.IS_STUB = !1),
        (this.connected = !0),
        (this.flashSize = null);
}
get _inputBuffer() {
    return this._parent ? this._parent._inputBuffer : this.__inputBuffer;
}
async initialize() {
    await this.hardReset(!0), this._parent || ((this.__inputBuffer = []), this.readLoop()), await this.sync();
    let t = await this.readRegister(1073745920),
        e = u[t >>> 0];
    if (void 0 === e) throw new Error(`Unknown Chip: Hex: ${a(t >>> 0, 8).toLowerCase()} Number: ${t}`);
    (this.chipName = e.name), (this.chipFamily = e.family);
    let i = p(this.getChipFamily()).macFuse;
    for (let t = 0; t < 4; t++) this._efuses[t] = await this.readRegister(i + 4 * t);
    this.logger.log(`Chip type ${this.chipName}`);
}
async readLoop() {
    this.debug && this.logger.debug("Starting read loop"), (this._reader = this.port.readable.getReader());
    const textDecoder = new TextDecoder();
    try {
        for (;;) {
            const { value: t, done: e } = await this._reader.read();
            if (e) {
                this._reader.releaseLock();
                break;
            }
            console.log(textDecoder.decode(t));
            t && 0 !== t.length && this._inputBuffer.push(...Array.from(t));
        }
    } catch (t) {
        console.error("Read loop got disconnected");
    }
    (this.connected = !1), this.dispatchEvent(new Event("disconnect")), this.logger.debug("Finished read loop");
}
async hardReset(t = !1) {
    this.logger.log("Try hard reset."), await this.port.setSignals({ dataTerminalReady: !1, requestToSend: !0 }), await this.port.setSignals({ dataTerminalReady: t, requestToSend: !1 }), await new Promise((t) => setTimeout(t, 1e3));
}
macAddr() {
    let t,
        e = new Array(6).fill(0),
        a = this._efuses[0],
        i = this._efuses[1],
        s = this._efuses[2],
        r = this._efuses[3];
    if (this.chipFamily == o) {
        if (0 != r) t = [(r >> 16) & 255, (r >> 8) & 255, 255 & r];
        else if (0 == ((i >> 16) & 255)) t = [24, 254, 52];
        else {
            if (1 != ((i >> 16) & 255)) throw new Error("Couldnt determine OUI");
            t = [172, 208, 116];
        }
        (e[0] = t[0]), (e[1] = t[1]), (e[2] = t[2]), (e[3] = (i >> 8) & 255), (e[4] = 255 & i), (e[5] = (a >> 24) & 255);
    } else if (this.chipFamily == l) (e[0] = (s >> 8) & 255), (e[1] = 255 & s), (e[2] = (i >> 24) & 255), (e[3] = (i >> 16) & 255), (e[4] = (i >> 8) & 255), (e[5] = 255 & i);
    else {
        if (this.chipFamily != h && this.chipFamily != d && this.chipFamily != f) throw new Error("Unknown chip family");
        (e[0] = (i >> 8) & 255), (e[1] = 255 & i), (e[2] = (a >> 24) & 255), (e[3] = (a >> 16) & 255), (e[4] = (a >> 8) & 255), (e[5] = 255 & a);
    }
    return e;
}
async readRegister(t) {
    this.debug && this.logger.debug("Reading from Register " + a(t, 8));
    let e = Ca("<I", t);
    await this.sendCommand(10, e);
    let [i, s] = await this.getResponse(10);
    return i;
}
async checkCommand(t, e, i = 0, s = 3e3) {
    (s = Math.min(s, 12e5)), await this.sendCommand(t, e, i);
    let [r, n] = await this.getResponse(t, s);
    if (null === n) throw new Error("Didn't get enough status bytes");
    let _ = 0;
    if ((this.IS_STUB || this.chipFamily == o ? (_ = 2) : [l, h, d, f].includes(this.chipFamily) ? (_ = 4) : [2, 4].includes(n.length) && (_ = n.length), n.length < _)) throw new Error("Didn't get enough status bytes");
    let c = n.slice(-_, n.length);
    if (((n = n.slice(0, -_)), this.debug && (this.logger.debug("status", c), this.logger.debug("value", r), this.logger.debug("data", n)), 1 == c[0]))
        throw 5 == c[1] ? new Error("Invalid (unsupported) command " + a(t)) : new Error("Command failure error code " + a(c[1]));
    return [r, n];
}
async sendCommand(t, e, a = 0) {
    let i = ((t) => {
        let e = [192];
        for (let a of t) 219 == a ? (e = e.concat([219, 221])) : 192 == a ? (e = e.concat([219, 220])) : e.push(a);
        return e.push(192), e;
    })([...Ca("<BBHI", 0, t, e.length, a), ...e]);
    this.debug && this.logger.debug(`Writing ${i.length} byte${1 == i.length ? "" : "s"}:`, i), await this.writeToStream(i);
}
async readPacket(t) {
    let s = null,
        r = !1,
        n = [];
    for (;;) {
        let o = Date.now();
        for (n = []; Date.now() - o < t; ) {
            if (this._inputBuffer.length > 0) {
                n.push(this._inputBuffer.shift());
                break;
            }
            await i(10);
        }
        if (0 == n.length) {
            throw new b("Timed out waiting for packet " + (null === s ? "header" : "content"));
        }
        this.debug && this.logger.debug("Read " + n.length + " bytes: " + e(n));
        for (let t of n)
            if (null === s) {
                if (192 != t) throw (this.debug && (this.logger.debug("Read invalid data: " + e(n)), this.logger.debug("Remaining data in serial buffer: " + e(this._inputBuffer))), new b("Invalid head of packet (" + a(t) + ")"));
                s = [];
            } else if (r)
                if (((r = !1), 220 == t)) s.push(192);
                else {
                    if (221 != t) throw (this.debug && (this.logger.debug("Read invalid data: " + e(n)), this.logger.debug("Remaining data in serial buffer: " + e(this._inputBuffer))), new b("Invalid SLIP escape (0xdb, " + a(t) + ")"));
                    s.push(219);
                }
            else if (219 == t) r = !0;
            else {
                if (192 == t) return this.debug && this.logger.debug("Received full packet: " + e(s)), s;
                s.push(t);
            }
    }
    throw new b("Invalid state");
}
async getResponse(t, e = 3e3) {
    for (let i = 0; i < 100; i++) {
        const i = await this.readPacket(e);
        if (i.length < 8) continue;
        const [s, r, n, o] = Ta("<BBHI", i.slice(0, 8));
        if (1 != s) continue;
        const l = i.slice(8);
        if (null == t || r == t) return [o, l];
        if (0 != l[0] && 5 == l[1]) throw ((this._inputBuffer.length = 0), new Error(`Invalid (unsupported) command ${a(t)}`));
    }
    throw "Response doesn't match request";
}
checksum(t, e = 239) {
    for (let a of t) e ^= a;
    return e;
}
async setBaudrate(t) {
    if (this.chipFamily == o) throw new Error("Changing baud rate is not supported on the ESP8266");
    this.logger.log("Attempting to change baud rate to " + t + "...");
    try {
        let e = Ca("<II", t, this.IS_STUB ? r : 0);
        await this.checkCommand(15, e);
    } catch (e) {
        throw (console.error(e), new Error(`Unable to change the baud rate to ${t}: No response from set baud rate command.`));
    }
    this._parent ? await this._parent.reconfigurePort(t) : await this.reconfigurePort(t);
}
async reconfigurePort(t) {
    var e;
    try {
        await (null === (e = this._reader) || void 0 === e ? void 0 : e.cancel()), await this.port.close(), await this.port.open({ baudRate: t }), this.readLoop(), this.logger.log(`Changed baud rate to ${t}`);
    } catch (e) {
        throw (console.error(e), new Error(`Unable to change the baud rate to ${t}: ${e}`));
    }
}
async sync() {
    for (let t = 0; t < 5; t++) {
        if (((this._inputBuffer.length = 0), await this._sync())) return await i(100), !0;
        await i(100);
    }
    throw new Error("Couldn't sync to ESP. Try resetting.");
}
async _sync() {
    await this.sendCommand(8, n);
    for (let t = 0; t < 8; t++)
        try {
            let [t, e] = await this.getResponse(8, 100);
            if (e.length > 1 && 0 == e[0] && 0 == e[1]) return !0;
        } catch (t) {}
    return !1;
}
getFlashWriteSize() {
    return this.IS_STUB ? 16384 : 1024;
}
async flashData(t, e, i = 0, s = !1) {
    if (t.byteLength >= 8) {
        var r = Array.from(new Uint8Array(t, 0, 4));
        let e = r[0],
            i = r[2],
            s = r[3];
        this.logger.log(`Image header, Magic=${a(e)}, FlashMode=${a(i)}, FlashSizeFreq=${a(s)}`);
    }
    let n,
        o = t.byteLength,
        l = 0,
        h = g;
    s
        ? ((n = Ba(new Uint8Array(t), { level: 9 }).buffer), (l = n.byteLength), this.logger.log(`Writing data with filesize: ${o}. Compressed Size: ${l}`), (h = await this.flashDeflBegin(o, l, i)))
        : (this.logger.log(`Writing data with filesize: ${o}`), (n = t), await this.flashBegin(o, i));
    let d = [],
        f = 0,
        _ = 0,
        c = 0,
        u = Date.now(),
        w = this.getFlashWriteSize(),
        m = s ? l : o;
    for (; m - c > 0; )
        this.debug && this.logger.log(`Writing at ${a(i + f * w, 8)} `),
            m - c >= w ? (d = Array.from(new Uint8Array(n, c, w))) : ((d = Array.from(new Uint8Array(n, c, m - c))), s || (d = d.concat(new Array(w - d.length).fill(255)))),
            s ? await this.flashDeflBlock(d, f, h) : await this.flashBlock(d, f),
            (f += 1),
            (_ += s ? Math.round((d.length * o) / l) : d.length),
            (c += w),
            e(Math.min(_, o), o);
    this.logger.log("Took " + (Date.now() - u) + "ms to write " + m + " bytes"), this.IS_STUB && (await this.flashBegin(0, 0), s ? await this.flashDeflFinish() : await this.flashFinish());
}
async flashBlock(t, e, a = 3e3) {
    await this.checkCommand(3, Ca("<IIII", t.length, e, 0, 0).concat(t), this.checksum(t), a);
}
async flashDeflBlock(t, e, a = 3e3) {
    await this.checkCommand(17, Ca("<IIII", t.length, e, 0, 0).concat(t), this.checksum(t), a);
}
async flashBegin(t = 0, e = 0, i = !1) {
    let s,
        r,
        n = this.getFlashWriteSize();
    !this.IS_STUB && [l, h, d, f].includes(this.chipFamily) && (await this.checkCommand(13, new Array(8).fill(0)));
    let _,
        c = Math.floor((t + n - 1) / n);
    (s = this.chipFamily == o ? this.getEraseSize(e, t) : t), (_ = this.IS_STUB ? g : m(3e4, t));
    let u = Date.now();
    return (
        (r = Ca("<IIII", s, c, n, e)),
        (this.chipFamily != l && this.chipFamily != h && this.chipFamily != d && this.chipFamily != f) || (r = r.concat(Ca("<I", i ? 1 : 0))),
        this.logger.log("Erase size " + s + ", blocks " + c + ", block size " + a(n, 4) + ", offset " + a(e, 4) + ", encrypted " + (i ? "yes" : "no")),
        await this.checkCommand(2, r, 0, _),
        0 == t || this.IS_STUB || this.logger.log("Took " + (Date.now() - u) + "ms to erase " + c + " bytes"),
        c
    );
}
async flashDeflBegin(t = 0, e = 0, a = 0, i = !1) {
    let s,
        r = this.getFlashWriteSize(),
        n = Math.floor((e + r - 1) / r),
        o = Math.floor((t + r - 1) / r),
        l = 0,
        h = 0;
    return this.IS_STUB ? ((l = t), (h = m(3e4, l))) : ((l = o * r), (h = g)), (s = Ca("<IIII", l, n, r, a)), await this.checkCommand(16, s, 0, h), h;
}
async flashFinish() {
    let t = Ca("<I", 1);
    await this.checkCommand(4, t);
}
async flashDeflFinish() {
    let t = Ca("<I", 1);
    await this.checkCommand(18, t);
}
getBootloaderOffset() {
    return p(this.getChipFamily()).flashOffs;
}
async flashId() {
    return await this.runSpiFlashCommand(159, [], 24);
}
getChipFamily() {
    return this._parent ? this._parent.chipFamily : this.chipFamily;
}
async writeRegister(t, e, a = 4294967295, i = 0, s = 0) {
    let r = Ca("<IIII", t, e, a, i);
    s > 0 && r.concat(Ca("<IIII", p(this.getChipFamily()).uartDateReg, 0, 0, s)), await this.checkCommand(9, r);
}
async setDataLengths(t, e, a) {
    if (-1 != t.mosiDlenOffs) {
        let i = t.regBase + t.mosiDlenOffs,
            s = t.regBase + t.misoDlenOffs;
        e > 0 && (await this.writeRegister(i, e - 1)), a > 0 && (await this.writeRegister(s, a - 1));
    } else {
        let i = t.regBase + t.usr1Offs,
            s = ((0 == a ? 0 : a - 1) << 8) | ((0 == e ? 0 : e - 1) << 17);
        await this.writeRegister(i, s);
    }
}
async waitDone(t, e) {
    for (let a = 0; a < 10; a++) {
        if (0 == ((await this.readRegister(t)) & e)) return;
    }
    throw Error("SPI command did not complete in time");
}
async runSpiFlashCommand(t, e, i = 0) {
    let s = p(this.getChipFamily()),
        r = s.regBase,
        n = r,
        o = r + s.usrOffs,
        l = r + s.usr2Offs,
        h = r + s.w0Offs,
        d = 1 << 18;
    if (i > 32) throw new Error("Reading more than 32 bits back from a SPI flash operation is unsupported");
    if (e.length > 64) throw new Error("Writing more than 64 bytes of data with one SPI command is unsupported");
    let f = 8 * e.length,
        _ = await this.readRegister(o),
        c = await this.readRegister(l),
        u = 1 << 31;
    if ((i > 0 && (u |= 268435456), f > 0 && (u |= 134217728), await this.setDataLengths(s, f, i), await this.writeRegister(o, u), await this.writeRegister(l, (7 << 28) | t), 0 == f)) await this.writeRegister(h, 0);
    else {
        e.concat(new Array(e.length % 4).fill(0));
        let t = Ta("I".repeat(Math.floor(e.length / 4)), e),
            i = h;
        this.logger.debug(`Words Length: ${t.length}`);
        for (const e of t) this.logger.debug(`Writing word ${a(e)} to register offset ${a(i)}`), await this.writeRegister(i, e), (i += 4);
    }
    await this.writeRegister(n, d), await this.waitDone(n, d);
    let g = await this.readRegister(h);
    return await this.writeRegister(o, _), await this.writeRegister(l, c), g;
}
async detectFlashSize() {
    this.logger.log("Detecting Flash Size");
    let t = await this.flashId(),
        e = 255 & t,
        i = (t >> 16) & 255;
    this.logger.log(`FlashId: ${a(t)}`),
        this.logger.log(`Flash Manufacturer: ${e.toString(16)}`),
        this.logger.log(`Flash Device: ${((t >> 8) & 255).toString(16)}${i.toString(16)}`),
        (this.flashSize = s[i]),
        this.logger.log(`Auto-detected Flash size: ${this.flashSize}`);
}
getEraseSize(t, e) {
    let a = 4096,
        i = Math.floor((e + a - 1) / a),
        s = 16 - (Math.floor(t / a) % 16);
    return i < s && (s = i), i < 2 * s ? Math.floor(((i + 1) / 2) * a) : (i - s) * a;
}
async memBegin(t, e, a, i) {
    return await this.checkCommand(5, Ca("<IIII", t, e, a, i));
}
async memBlock(t, e) {
    return await this.checkCommand(7, Ca("<IIII", t.length, e, 0, 0).concat(t), this.checksum(t));
}
async memFinish(t = 0) {
    let e = this.IS_STUB ? g : 500,
        a = Ca("<II", 0 == t ? 1 : 0, t);
    return await this.checkCommand(6, a, 0, e);
}
async runStub() {
    const t = await y(this.chipFamily);
    let e,
        a = 2048;
    this.logger.log("Uploading stub...");
    for (let e of ["text", "data"])
        if (Object.keys(t).includes(e)) {
            let i = t[e + "_start"],
                s = t[e].length,
                r = Math.floor((s + a - 1) / a);
            await this.memBegin(s, r, a, i);
            for (let i of Array(r).keys()) {
                let r = i * a,
                    n = r + a;
                n > s && (n = s), await this.memBlock(t[e].slice(r, n), i);
            }
        }
    this.logger.log("Running stub..."), await this.memFinish(t.entry);
    const i = await this.readPacket(500);
    if (((e = String.fromCharCode(...i)), "OHAI" != e)) throw new Error("Failed to start stub. Unexpected response: " + e);
    this.logger.log("Stub is now running...");
    const s = new La(this.port, this.logger, this);
    return await s.detectFlashSize(), s;
}
async writeToStream(t) {
    const e = this.port.writable.getWriter();
    await e.write(new Uint8Array(t));
    try {
        e.releaseLock();
    } catch (t) {
        console.error("Ignoring release lock error", t);
    }
}
async disconnect() {
    this._parent
        ? await this._parent.disconnect()
        : (await this.port.writable.getWriter().close(),
          await new Promise((t) => {
              this._reader || t(void 0), this.addEventListener("disconnect", t, { once: !0 }), this._reader.cancel();
          }),
          (this.connected = !1));
}
}
class La extends Za {
constructor() {
    super(...arguments), (this.IS_STUB = !0);
}
async memBegin(t, e, i, s) {
    let r = await y(this.chipFamily),
        n = s,
        o = s + t;
    console.log(n, o), console.log(r.data_start, r.data.length, r.text_start, r.text.length);
    for (let [t, e] of [
        [r.data_start, r.data_start + r.data.length],
        [r.text_start, r.text_start + r.text.length],
    ])
        if (n < e && o > t) throw new Error("Software loader is resident at " + a(t, 8) + "-" + a(e, 8) + ". Can't load binary at overlapping address range " + a(n, 8) + "-" + a(o, 8) + ". Try changing the binary loading address.");
}
async eraseFlash() {
    await this.checkCommand(208, [], 0, w);
}
}
const Ma = async (t) => {
const e = await navigator.serial.requestPort();
return t.log("Connecting..."), await e.open({ baudRate: r }), t.log("Connected successfully."), new Za(e, t);
};
export { l as CHIP_FAMILY_ESP32, f as CHIP_FAMILY_ESP32C3, _ as CHIP_FAMILY_ESP32C6, c as CHIP_FAMILY_ESP32H2, h as CHIP_FAMILY_ESP32S2, d as CHIP_FAMILY_ESP32S3, o as CHIP_FAMILY_ESP8266, Za as ESPLoader, Ma as connect };
