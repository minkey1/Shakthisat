import { motion } from 'framer-motion';
import { Sparkles, Target, Infinity } from 'lucide-react';

const WhyGirlsInSpace = () => {
  return (
    <section className='min-h-screen py-20 px-4 md:px-8' id='why-girls'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Content Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='space-y-6'
          >
            {/* Title Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='bg-gradient-to-br from-teal-900/40 to-purple-900/40 rounded-2xl p-8 border border-teal-500/30'
            >
              <h2 className='text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text'>
                WHY GIRLS IN SPACE?
              </h2>
            </motion.div>

            {/* Stat Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className='bg-gradient-to-br from-teal-900/40 to-purple-900/40 rounded-2xl p-8 border border-teal-500/20 text-center'
            >
              <div className='w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-400 to-purple-400 flex items-center justify-center'>
                <span className='text-4xl font-bold text-white'>11%</span>
              </div>
              <p className='text-lg text-white/90'>
                Of all astronauts launched to space have been women.
              </p>
            </motion.div>

            {/* Description Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className='bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-2xl p-6 border border-purple-400/20'
            >
              <p className='text-base md:text-lg font-semibold text-transparent bg-gradient-to-r from-teal-300 to-purple-300 bg-clip-text'>
                We believe in equal access to infinity — every girl deserves the chance to reach beyond the sky.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className='grid grid-cols-1 gap-4'>
              {[
                { icon: Sparkles, title: 'Ignite Passion', desc: 'Spark curiosity' },
                { icon: Target, title: 'Nurture Leadership', desc: 'Build confidence' },
                { icon: Infinity, title: 'Dismantle Limits', desc: 'Break barriers' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-black/60 rounded-xl p-4 border border-teal-500/20 flex items-center space-x-3 hover:border-teal-500/40 transition-all group'
                >
                  <div className='w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform'>
                    <item.icon className='w-5 h-5 text-white' />
                  </div>
                  <div className='min-w-0'>
                    <h4 className='text-white font-semibold text-sm md:text-base'>{item.title}</h4>
                    <p className='text-teal-200 text-xs md:text-sm'>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Globe Animation Space */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='hidden lg:flex items-center justify-center h-screen'
          >
            {/* Empty space for globe animation */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyGirlsInSpace;