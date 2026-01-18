import { motion } from 'framer-motion';
import { Heart, Badge as Bridge, Star } from 'lucide-react';

const WhatIsShakthiSat = () => {
  return (
    <section className='min-h-screen py-20 px-4 md:px-8' id='what-shakthisat'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Globe Animation Space */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className='hidden lg:flex items-center justify-center h-screen'
          >
            {/* Empty space for globe animation */}
          </motion.div>

          {/* Content Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
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
              className='bg-gradient-to-br from-purple-900/40 to-teal-900/40 rounded-2xl p-8 border border-purple-500/30'
            >
              <h2 className='text-2xl md:text-3xl text-teal-300 font-medium mb-2'>
                WHAT IS MISSION
              </h2>
              <h3 className='text-3xl md:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-teal-300 bg-clip-text'>
                "ShakthiSAT" ?
              </h3>
            </motion.div>

            {/* Description Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className='bg-gradient-to-br from-purple-900/30 to-teal-900/30 rounded-2xl p-6 border border-purple-500/20'
            >
              <p className='text-base md:text-lg text-white/80 leading-relaxed'>
                ShakthiSAT represents more than a satellite mission—it's a philosophy of building bridges across cultures through STEM and space collaboration.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <div className='grid grid-cols-1 gap-4'>
              {[
                { icon: Heart, title: 'Beacon of Hope', desc: 'International cooperation' },
                { icon: Bridge, title: 'Building Bridges', desc: 'Cultures through STEM' },
                { icon: Star, title: 'Shared Purpose', desc: 'Discovery enriched by unity' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-black/60 rounded-xl p-4 border border-purple-500/20 flex items-center space-x-3 hover:border-purple-500/40 transition-all group'
                >
                  <div className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform'>
                    <item.icon className='w-5 h-5 text-white' />
                  </div>
                  <div className='min-w-0'>
                    <h4 className='text-white font-semibold text-sm md:text-base'>{item.title}</h4>
                    <p className='text-purple-200 text-xs md:text-sm'>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsShakthiSat;